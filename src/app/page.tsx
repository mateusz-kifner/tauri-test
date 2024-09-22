"use client";
import { useEffectOnce } from "@/hooks/useEffectOnce";
import { open } from '@tauri-apps/plugin-dialog';
import { readFile } from "@tauri-apps/plugin-fs";
import { useState } from "react";


export default function Home() {
  const [filePath, setFilePath] = useState<string | null>(null)

  useEffectOnce( ()=>{
    
    open({
      multiple: false,
      directory: false,
    }).then((f) => {
      readFile(f?? "",{}).then((data)=>{
        const blob = new Blob([data], { type: 'image/png' });
        const objectURL = URL.createObjectURL(blob);
        setFilePath(objectURL)
      })
    }).catch((e) => console.log(e));
  
  
    
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    {filePath}
    <img src={filePath??""} className="w-96 h-96 object-cover" />
     </div>
  );
}
