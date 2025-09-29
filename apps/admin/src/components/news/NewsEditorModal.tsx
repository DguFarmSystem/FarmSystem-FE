import { useState, useEffect, KeyboardEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NewsItemMutationDto } from '@/apis/news/dto';
import { useNewsDetail } from '@/apis/news/queries/useNewsDetail.query';

interface NewsEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewsItemMutationDto) => void;
  newsId?: number; // 수정용 ID만 전달
}

export default function NewsEditorModal({
  isOpen,
  onClose,
  onSubmit,
  newsId,
}: NewsEditorModalProps) {
  const { data: detail, isLoading } = useNewsDetail(newsId!, { enabled: !!newsId && isOpen });
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const draftKey = `news-draft-${newsId ?? 'new'}`;

  // 쓰기
  useEffect(() => {
    // detail이 아직 없으면 저장하지 않음
    if (!isOpen) return;
    if (newsId) return; // 수정 모드인데 서버 데이터가 안왔으면 저장 금지

    localStorage.setItem(draftKey, JSON.stringify({ title, content, tags, imageUrls }));
  }, [title, content, tags, imageUrls, draftKey, detail, isOpen]);

  // 읽기
  useEffect(() => {
    if (!isOpen) return;
    const draft = localStorage.getItem(draftKey);
    if (draft) {
      const data = JSON.parse(draft);
      setTitle(data.title ?? '');
      setContent(data.content ?? '');
      setTags(data.tags ?? []);
      setThumbnailUrl(data.thumbnailUrl ?? '');
      setImageUrls(data.imageUrls ?? []);
    } else if (detail) {
      setTitle(detail.title || '');
      setContent(detail.content || '');
      setTags(detail.tags || []);
      setThumbnailUrl(detail.thumbnailUrl || '');
      setImageUrls(detail.imageUrls || []);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
      setThumbnailUrl('');
      setImageUrls([]);
    }
    setTagInput('');
    setSelectedImage(null);
  }, [isOpen, detail, draftKey]);

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags(prev => [...prev, newTag]);
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    onSubmit({ title, thumbnailUrl, imageUrls, tags, content });
    localStorage.removeItem(`news-draft-${newsId ?? 'new'}`); // 제출 후 임시 저장 삭제
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-4xl w-full max-h-[80vh] p-4 overflow-auto" // 너비 늘리고 높이 제한 + 내부 스크롤
      >
        <DialogHeader>
          <DialogTitle>{newsId ? '뉴스 수정' : '뉴스 추가'}</DialogTitle>
          <DialogDescription>
            {newsId ? '뉴스를 수정하고 저장하세요.' : '새로운 뉴스를 작성하고 저장하세요.'}
          </DialogDescription>
        </DialogHeader>

        {isLoading && newsId ? (
          <div>로딩중...</div>
        ) : (
          <div className="flex flex-col gap-4 mt-2">
            {/* 제목 */}
            <div>
              <Label>제목</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            {/* 썸네일 */}
            <div>
              <Label>썸네일 URL</Label>
              <Input value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} />
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="thumbnail-preview"
                  className="mt-2 w-32 h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
                  onClick={() => setSelectedImage(thumbnailUrl)}
                />
              )}
            </div>

            {/* 추가 이미지 */}
            <div>
              <Label>추가 이미지</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {imageUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`image-${idx}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:scale-105 transition"
                    onClick={() => setSelectedImage(url)}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">※ 이미지 업로드 기능은 추후 구현</p>
            </div>

            {/* 태그 */}
            <div>
              <Label>태그</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Enter 또는 , 로 추가"
                className="mt-1"
              />
            </div>

            {/* 내용 */}
            <div>
              <Label>내용 미리보기</Label>
              <Textarea value={content} onChange={e => setContent(e.target.value)} rows={4} />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button onClick={handleSubmit}>{newsId ? '수정' : '추가'}</Button>
            </div>

            {/* 이미지 클릭 모달 */}
            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
              <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none border-none">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="preview"
                    className="max-h-[80vh] w-auto mx-auto rounded-lg shadow-lg"
                  />
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
