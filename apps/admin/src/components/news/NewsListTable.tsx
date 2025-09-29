import { useState, useMemo } from 'react';
import { NewsDto, NewsItemMutationDto } from '@/apis/news/dto';
import { useAllNews } from '@/apis/news/queries/useAllNews.qurey';
import { useCreateNews } from '@/apis/news/mutations/useNewsCreate.mutation';
import { useEditNews } from '@/apis/news/mutations/useNewsEdit.mutation';
import { useDeleteNews } from '@/apis/news/mutations/useNewsDelete.mutation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Loader from '@/components/status/loading/Loader';
import { format } from 'date-fns';
import { ArrowUpDown, RotateCcw, Edit, Trash2, Plus } from 'lucide-react';
import NewsEditorModal from './NewsEditorModal'; // 모달 컴포넌트 import

export default function NewsTable() {
  const { data: news, isLoading, isError, refetch, isRefetching } = useAllNews();
  const createNewsMutation = useCreateNews();
  const editNewsMutation = useEditNews();
  const deleteNewsMutation = useDeleteNews();

  const [sortKey, setSortKey] = useState<keyof NewsDto>('newsId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 모달 상태
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsDto | undefined>(undefined);

  const handleSort = (key: keyof NewsDto) => {
    if (sortKey === key) setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedNews = useMemo(() => {
    if (!news) return [];
    return [...news].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === 'string' && typeof bValue === 'string')
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      if (typeof aValue === 'number' && typeof bValue === 'number')
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      return 0;
    });
  }, [news, sortKey, sortOrder]);

  if (isLoading) return <Loader />;
  if (isError) return <div>뉴스 목록을 불러오는 중 오류가 발생했습니다.</div>;

  const handleEditClick = (item: NewsDto) => {
    setEditingNews(item);
    setModalOpen(true);
  };

  const handleDelete = (newsId: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    deleteNewsMutation.mutate(
      { newsId },
      {
        onSuccess: () => refetch(),
      },
    );
  };

  const handleModalSubmit = (data: NewsItemMutationDto) => {
    if (editingNews) {
      // 수정
      editNewsMutation.mutate({ newsId: editingNews.newsId, data }, { onSuccess: () => refetch() });
    } else {
      // 새 뉴스 생성
      createNewsMutation.mutate(data, { onSuccess: () => refetch() });
    }
  };

  const handleAddNew = () => {
    setEditingNews(undefined);
    setModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>뉴스 목록</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddNew}
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            추가
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isRefetching}
            className="flex items-center gap-1"
          >
            <RotateCcw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
            {isRefetching ? '갱신 중...' : '새로 고침'}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {sortedNews.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead onClick={() => handleSort('newsId')} label="ID" />
                <SortableHead onClick={() => handleSort('title')} label="제목" />
                <TableHead>썸네일</TableHead>
                <TableHead>태그</TableHead>
                <SortableHead onClick={() => handleSort('createdAt')} label="작성일" />
                <SortableHead onClick={() => handleSort('updatedAt')} label="수정일" />
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedNews.map(item => (
                <TableRow key={item.newsId}>
                  <TableCell>{item.newsId}</TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded cursor-pointer hover:scale-105 transition"
                        onClick={() => setSelectedImage(item.thumbnailUrl)}
                      />
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                  <TableCell>{item.tags.join(', ')}</TableCell>
                  <TableCell>{format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell>{format(new Date(item.updatedAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditClick(item)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                      수정
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.newsId)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>등록된 뉴스가 없습니다.</div>
        )}
      </CardContent>

      {/* 이미지 클릭 모달 */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="news-thumbnail"
              className="max-h-[80vh] w-auto mx-auto rounded-lg shadow-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 뉴스 추가/수정 모달 */}
      <NewsEditorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        newsId={editingNews?.newsId}
      />
    </Card>
  );
}

function SortableHead({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <TableHead onClick={onClick} className="cursor-pointer select-none hover:bg-gray-50 transition">
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-4 h-4 opacity-50" />
      </div>
    </TableHead>
  );
}
