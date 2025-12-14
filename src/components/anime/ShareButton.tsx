import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Link2, Twitter, Facebook, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, url, className = '' }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const shareUrl = url || window.location.href;
  const shareText = `Check out ${title} on AnimeHub!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="secondary"
        onClick={handleNativeShare}
        leftIcon={<Share2 size={18} />}
      >
        Share
      </Button>

      <AnimatePresence>
        {isOpen && !navigator.share && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-56 bg-white border-2 border-surface-200 
                         rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              <div className="p-2">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                           hover:bg-surface-100 transition-colors text-left"
                >
                  {copied ? (
                    <Check size={18} className="text-emerald-500" />
                  ) : (
                    <Link2 size={18} className="text-surface-600" />
                  )}
                  <span className="text-surface-700 font-medium">
                    {copied ? 'Copied!' : 'Copy link'}
                  </span>
                </button>

                <div className="h-px bg-surface-200 my-2" />

                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                             hover:bg-surface-100 transition-colors"
                  >
                    <link.icon size={18} className="text-surface-600" />
                    <span className="text-surface-700 font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
