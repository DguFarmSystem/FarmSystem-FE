import { useState, useMemo } from 'react';
import { NewsDto } from '@/apis/news/dto';
import { useAllNews } from '@/apis/news/queries/useAllNews.qurey';
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
import Loader from '@/components/status/loading/Loader';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

export default function NewsTable() {
  const { data: news, isLoading, isError } = useAllNews();
  const [sortKey, setSortKey] = useState<keyof NewsDto>('newsId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 정렬 토글 함수
  const handleSort = (key: keyof NewsDto) => {
    if (sortKey === key) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // 정렬된 데이터
  const sortedNews = useMemo(() => {
    if (!news) return [];
    return [...news].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [news, sortKey, sortOrder]);

  if (isLoading) return <Loader />;
  if (isError) return <div>뉴스 목록을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>뉴스 목록</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedNews && sortedNews.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHead onClick={() => handleSort('newsId')} label="ID" />
                <SortableHead onClick={() => handleSort('title')} label="제목" />
                <TableHead>썸네일</TableHead>
                <TableHead>태그</TableHead>
                <SortableHead onClick={() => handleSort('createdAt')} label="작성일" />
                <SortableHead onClick={() => handleSort('updatedAt')} label="수정일" />
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>등록된 뉴스가 없습니다.</div>
        )}
      </CardContent>

      {/* ✅ 이미지 클릭 시 모달 */}
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
