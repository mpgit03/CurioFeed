'use client'


import { useAuth } from "@clerk/nextjs";
import { getFollowedSourceIds } from "@/services/feed";
import { useEffect,useState } from "react";
import {follow,unfollow} from "@/services/feed"


export function useFollowedSources() {
    const { getToken } = useAuth();

    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string | null>(null);
    const [followedSourceIds, setFollowedSourceIds] = useState<Set<string>>(new Set());
    const [pendingSourceId, setPendingSourceId] = useState<string | null>(null);

    
    useEffect(()=>{
            loadFollowedSources();
        },[]);
        
                

    async function loadFollowedSources() {
        try{
        setLoading(true);
        const token = await getToken();
        if(!token){
            setLoading(false);
            return ;
        }

        const sourceIds = await getFollowedSourceIds({token});

        setFollowedSourceIds(sourceIds);
        
        }catch(error){
        setError("Unable to load followed sources");
        }finally{
        setLoading(false);
        }

        
    }

    async function followSource(sourceId:string) {
        console.log("followSource called", sourceId);
        setPendingSourceId(sourceId);

        try{ 
            setLoading(true);
            
            const token = await getToken();
            if(!token){
                setLoading(false);
                return;
            }
            await follow({sourceId,token});

            setFollowedSourceIds( prev => {
                const updated = new Set(prev);
                updated.add(sourceId);
                return updated;
            });
            
        }catch(error){

            setError("unable to follow");
        }finally{
            setPendingSourceId(null);
            setLoading(false);
        }
    };



    async function unfollowSource(sourceId:string) {
        setPendingSourceId(sourceId);
        try{
            setLoading(true);
            const token = await getToken();
            if(!token){
                setLoading(false);
                return;
            }
            await unfollow({sourceId,token});
           

            setFollowedSourceIds( prev =>{
                const updated = new Set(prev);
                updated.delete(sourceId);
                return updated;
            })



        }catch(error){
            setError("Unable to unfollow");

        }finally{
            setLoading(false);
            setPendingSourceId(null);
        }
        
    };

    function isFollowing(sourceId: string) {
        return followedSourceIds.has(sourceId);
    }   
    function isPending(sourceId: string) {
        return pendingSourceId === sourceId;
    }

        

        return {
            loading,
            error,
            followedSourceIds,
            followSource,
            unfollowSource,
            isFollowing,
            isPending,
           }

        
        
    }
    

    
