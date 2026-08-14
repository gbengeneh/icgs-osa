'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, ApiUser } from '@/lib/api';

type AuthContextValue = { user: ApiUser | null; token: string | null; loading: boolean; login: (email:string,password:string)=>Promise<ApiUser>; logout:()=>Promise<void>; refresh:()=>Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){
  const [user,setUser]=useState<ApiUser|null>(null); const [token,setToken]=useState<string|null>(null); const [loading,setLoading]=useState(true); const router=useRouter();
  const refresh=useCallback(async()=>{const saved=localStorage.getItem('icgs_osa_token');if(!saved){setLoading(false);return}setToken(saved);try{setUser(await api<ApiUser>('/me',{},saved))}catch{localStorage.removeItem('icgs_osa_token');setToken(null);setUser(null)}finally{setLoading(false)}},[]);
  useEffect(()=>{refresh()},[refresh]);
  const login=async(email:string,password:string)=>{const result=await api<{token:string,user:ApiUser}>('/login',{method:'POST',body:JSON.stringify({email,password})});localStorage.setItem('icgs_osa_token',result.token);setToken(result.token);setUser(result.user);return result.user};
  const logout=async()=>{try{if(token)await api('/logout',{method:'POST'},token)}finally{localStorage.removeItem('icgs_osa_token');setToken(null);setUser(null);router.replace('/login')}};
  const value=useMemo(()=>({user,token,loading,login,logout,refresh}),[user,token,loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(){const value=useContext(AuthContext);if(!value)throw new Error('useAuth must be used inside AuthProvider');return value}
