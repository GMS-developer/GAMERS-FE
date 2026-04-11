'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Upload, X, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContestCreateFormValues } from '../schema';

export function ImageSettingsSection() {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext<ContestCreateFormValues>();
  
  const thumbPreview = watch('thumbnail');

  const handleThumbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Set the file object for API submission
      setValue('thumbnail_file', file);
      
      // Set the preview URL
      const reader = new FileReader();
      reader.onloadend = () => setValue('thumbnail', reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleClearThumb = () => {
    setValue('thumbnail', null);
    setValue('thumbnail_file', null);
  };

  return (
    <div className="flex flex-col gap-8 rounded-3xl bg-[#141418] border border-white/5 p-8 shadow-xl shadow-black/20" id="image_settings">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-[#EEEEF0] tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-mint" />
            {t('contests.create.sections.image_settings')}
          </h2>
          <p className="text-sm text-[#7A7A85]">{t('contests.create.image_settings_subtitle', '대회의 시각적인 정체성을 설정합니다.')}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnail Upload */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <label className="text-[13px] font-bold text-[#BBBBCB]">
            {t('contests.create.image.thumbnail')}
          </label>
          <div className="relative aspect-video rounded-2xl group overflow-hidden border-2 border-dashed border-[#242428] hover:border-neon-mint/30 transition-all bg-[#0C0C0F]">
            {thumbPreview ? (
              <>
                <img src={thumbPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                  <Camera className="h-6 w-6 text-white" />
                  <span className="text-[11px] font-black text-white uppercase">{t('contests.create.image.replace')}</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
                <div className="w-12 h-12 rounded-xl bg-[#1C1C21] flex items-center justify-center text-[#4A4A55] group-hover:text-neon-mint group-hover:scale-110 transition-all">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-black text-[#7A7A85] group-hover:text-[#EEEEF0]">{t('contests.create.image.click_to_upload')}</span>
                  <span className="text-[9px] font-medium text-[#4A4A55]">{t('contests.create.image.upload_desc')}</span>
                </div>
              </div>
            )}
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleThumbUpload} accept="image/*" />
            
            {thumbPreview && (
              <button 
                onClick={handleClearThumb}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

