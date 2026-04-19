'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  Image as ImageIcon, 
  Send, 
  Tags, 
  ChevronDown,
  Info,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const categories = [
  { id: 'free', key: 'free' },
  { id: 'tips', key: 'tips' },
  { id: 'recruiting', key: 'recruiting' },
  { id: 'reviews', key: 'reviews' },
];

export function WritePostForm() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(1, t('community.write.validation.title_required')),
    content: z.string().min(1, t('community.write.validation.content_required')),
    category: z.string().min(1, t('community.write.validation.category_required')),
  });

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      category: '',
    },
  });

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (tags.length < 5 && !tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
        setTagInput('');
      }
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FormValues) => {
    console.log({ ...data, tags });
    // Handle submission logic (API call)
    alert('Post published successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card w-full rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-neon-purple/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-neon-mint/5 blur-[80px] rounded-full pointer-events-none" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black font-barlow text-white tracking-tight uppercase italic flex items-center gap-3">
            <span className="h-2 w-10 bg-neon-mint rounded-full" />
            {t('community.write.title')}
          </h2>
          <p className="text-muted-gray font-medium">
            {t('community.write.subtitle')}
          </p>
        </div>

        {/* Input Sections */}
        <div className="space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-1">
              {t('community.write.fields.title_label')}
            </label>
            <Input 
              {...register('title')}
              placeholder={t('community.write.fields.title_placeholder')}
              className={cn(
                "h-14 text-lg font-bold border-white/5 bg-white/[0.02]",
                errors.title && "border-neon-red/50 focus-visible:ring-neon-red"
              )}
            />
            {errors.title && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-xs text-neon-red font-medium flex items-center gap-1 mt-1 ml-1"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.title.message}
              </motion.span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Selector */}
            <div className="space-y-2 relative">
              <label className="text-sm font-bold text-foreground/70 ml-1">
                {t('community.write.fields.category_label')}
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={cn(
                    "flex h-14 w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#EEEEF0] transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-neon-mint hover:border-white/10",
                    selectedCategory ? "text-foreground font-bold" : "text-[#7A7A85]",
                    errors.category && "border-neon-red/50"
                  )}
                >
                  {selectedCategory 
                    ? t(`community.categories.${categories.find(c => c.id === selectedCategory)?.key}`) 
                    : t('community.write.fields.category_label')}
                  <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isCategoryOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-[#141418] p-2 shadow-2xl backdrop-blur-xl"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.id);
                            setValue('category', cat.id);
                            setIsCategoryOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-white/5",
                            selectedCategory === cat.id ? "text-neon-mint bg-neon-mint/5" : "text-muted-gray"
                          )}
                        >
                          {t(`community.categories.${cat.key}`)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {errors.category && (
                <span className="text-xs text-neon-red font-medium flex items-center gap-1 mt-1 ml-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Tag Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/70 ml-1">
                {t('community.write.fields.tags_label')}
              </label>
              <div className="relative group">
                <Input 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder={tags.length >= 5 ? "Max reached" : t('community.write.fields.tags_placeholder')}
                  disabled={tags.length >= 5}
                  className="h-14 border-white/5 bg-white/[0.02]"
                />
                <Tags className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-gray group-focus-within:text-neon-mint transition-colors pointer-events-none" />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <AnimatePresence>
                  {tags.map((tag, index) => (
                    <motion.span 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neon-mint/10 border border-neon-mint/20 text-neon-mint text-xs font-bold transition-all hover:bg-neon-mint/20"
                    >
                      #{tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(index)}
                        className="hover:text-foreground transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-1">
              {t('community.write.fields.content_label')}
            </label>
            <Textarea 
              {...register('content')}
              placeholder={t('community.write.fields.content_placeholder')}
              className={cn(
                "min-h-[400px] text-base leading-relaxed border-white/5 bg-white/[0.02] p-6 focus-visible:ring-neon-purple/50",
                errors.content && "border-neon-red/50 focus-visible:ring-neon-red"
              )}
            />
            {errors.content && (
              <span className="text-xs text-neon-red font-medium flex items-center gap-1 mt-1 ml-1">
                <AlertCircle className="h-3 w-3" />
                {errors.content.message}
              </span>
            )}
          </div>

          {/* Image Upload Area Placeholder */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-1">
              {t('community.write.fields.upload_image')}
            </label>
            <div className="group relative h-40 w-full rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.01] transition-all hover:bg-white/[0.03] hover:border-white/10 flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden leading-none">
              <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-muted-gray group-hover:text-neon-mint group-hover:scale-110 transition-all">
                <Plus className="h-6 w-6" />
              </div>
              <span className="text-sm text-muted-gray font-medium group-hover:text-foreground transition-colors">
                {t('community.write.fields.upload_image')}
              </span>
              <ImageIcon className="absolute -bottom-2 -right-2 h-16 w-16 text-white/[0.02] -rotate-12" />
            </div>
            <div className="flex items-start gap-2 text-[11px] text-muted-gray mt-2 ml-1">
              <Info className="h-3 w-3 flex-shrink-0 mt-0.5" />
              <span>SVG, PNG, JPG or GIF (max. 10MB) · Recommended: 1200x630</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-6 mt-8 border-t border-white/5">
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full sm:w-auto text-muted-gray hover:text-white font-bold h-14 px-8 rounded-xl"
            onClick={() => window.history.back()}
          >
            {t('community.write.cancel')}
          </Button>
          <Button 
            type="submit" 
            className="w-full sm:w-auto h-14 px-10 rounded-xl bg-neon-mint text-deep-black font-black flex items-center gap-2 hover:bg-neon-mint/90 shadow-[0_4px_30px_rgba(0,212,122,0.2)] hover:shadow-neon-mint/30 active:scale-95 transition-all"
          >
            <Send className="h-5 w-5 fill-current" />
            {t('community.write.publish')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
