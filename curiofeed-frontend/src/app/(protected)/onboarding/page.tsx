"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CircleAlert,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";

import TopicGrid from "@/components/onboarding/TopicGrid";
import { getTopics, savePreferences } from "@/services/feed";
import { FeedTopic } from "@/types/feed";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const MIN_TOPICS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { getToken } = useAuth();
  const { refetch } = useCurrentUser();

  const [topics, setTopics] = useState<FeedTopic[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTopics() {
      try {
        setLoading(true);
        setError(null);

        const availableTopics = await getTopics();
        setTopics(availableTopics);
      } catch (loadError) {
        const message =
          loadError instanceof Error
            ? loadError.message
            : "Unable to load available topics";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void loadTopics();
  }, []);

  const handleToggleTopic = (topicId: string) => {
    setSelectedTopicIds((currentSelectedTopicIds) => {
      if (currentSelectedTopicIds.includes(topicId)) {
        return currentSelectedTopicIds.filter((id) => id !== topicId);
      }

      return [...currentSelectedTopicIds, topicId];
    });
  };

  const handleContinue = async () => {
    if (selectedTopicIds.length < MIN_TOPICS) {
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const token = await getToken();

      if (!token) {
        throw new Error("Authentication failed");
      }

      await savePreferences({
        token,
        topicIds: selectedTopicIds,
      });

      // Refresh the current user so onboardingCompleted is updated
      await refetch();

      // Replace instead of push so user can't go back to onboarding
      router.replace("/my-feed");
    } catch (saveError) {
      const message =
        saveError instanceof Error
          ? saveError.message
          : "Unable to save your preferences";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const canContinue =
    selectedTopicIds.length >= MIN_TOPICS && !saving;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Loading topics...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <CircleAlert className="mx-auto h-8 w-8 text-red-500" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            We couldn’t load onboarding topics
          </h2>
          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Sparkles className="mx-auto h-8 w-8 text-slate-500" />
          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            No topics are available yet
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Topics will appear here once the CurioFeed catalog is refreshed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              <Sparkles className="h-4 w-4" />
              CurioFeed onboarding
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Choose the topics you want to follow
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Pick at least three topics to personalize your reading experience.
              Your feed will learn from these choices and surface stories that
              fit your interests.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <span className="font-semibold text-slate-950">
              {selectedTopicIds.length}
            </span>{" "}
            / {MIN_TOPICS} selected
          </div>
        </div>

        <div className="mt-8">
          <TopicGrid
            topics={topics}
            selectedTopicIds={selectedTopicIds}
            onToggle={handleToggleTopic}
          />
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            {selectedTopicIds.length < MIN_TOPICS
              ? `Select ${MIN_TOPICS} topics to continue.`
              : "Great choice — you're ready to continue."}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {saving ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}