import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { instance } from '@/apis/instance';
import { CATEGORIES } from '@/apis/blogs/dto';

interface Props {
  open: boolean;
  onClose: () => void;
}

const CATEGORIES_MAP: Record<CATEGORIES, string> = {
  SEMINAR: '세미나',
  PROJECT: '프로젝트',
  STUDY: '스터디',
  HACKATHON: '해커톤',
  REVIEW: '리뷰',
  LECTURE: '강의',
  ETC: '기타',
} as const;
type CATEGORIES_KEY = keyof typeof CATEGORIES_MAP;

export default function ModalBlogCreate({ open, onClose }: Props) {
  const [link, setLink] = useState('');
  const [categories, setCategories] = useState<CATEGORIES_KEY[]>([]);

  useEffect(() => {
    if (!open) {
      setLink('');
      setCategories([]);
    }
  }, [open]);

  const toggleCategory = (cat: CATEGORIES_KEY) => {
    setCategories(prev => (prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]));
  };

  const handleSubmit = async () => {
    try {
      await instance.post('/api/admin/blogs', { link, categories }); // 영어 키 그대로 POST
      onClose();
    } catch (err) {
      console.error(err);
      alert('블로그 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>블로그 직접 생성</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">블로그 링크</label>
            <Input
              value={link}
              onChange={e => setLink(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">카테고리 선택</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORIES_MAP).map(([key, label]) => (
                <label key={key} className="flex items-center gap-1">
                  <Checkbox
                    checked={categories.includes(key as CATEGORIES_KEY)}
                    onCheckedChange={() => toggleCategory(key as CATEGORIES_KEY)}
                  />
                  {label} {/* UI에는 한글 표시 */}
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleSubmit}>생성</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
