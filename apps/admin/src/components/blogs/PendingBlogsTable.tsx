import { usePendingBlogs } from '@/apis/blogs/queries/usePendingBlogs.query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Loader from '@/components/status/loading/Loader';
import { format } from 'date-fns';

export default function PendingBlogsTable() {
  const { data: blogs, isLoading, isError } = usePendingBlogs();

  if (isLoading) return <Loader />;
  if (isError) return <div>블로그 목록을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>승인 대기중 블로그</CardTitle>
      </CardHeader>
      <CardContent>
        {blogs && blogs.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>링크</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>신청일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map(blog => (
                <TableRow key={blog.blogId}>
                  <TableCell>{blog.blogId}</TableCell>
                  <TableCell>
                    <a
                      href={blog.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {blog.link}
                    </a>
                  </TableCell>
                  <TableCell>{blog.userNickname}</TableCell>
                  <TableCell>{format(new Date(blog.appliedAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>승인 대기중인 블로그가 없습니다.</div>
        )}
      </CardContent>
    </Card>
  );
}
