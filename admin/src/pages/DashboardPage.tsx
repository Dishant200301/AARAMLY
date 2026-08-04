import React from 'react';
import { 
  Package, 
  Globe, 
  FileText, 
  Layers, 
  FolderTree, 
  MessageSquare, 
  Mail, 
  AlertTriangle, 
  ArrowUpRight, 
  Eye, 
  Plus,
  Tag
} from 'lucide-react';
import { AdminApiService } from '../services/adminApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';

interface DashboardPageProps {
  onNavigate: (tab: string, productId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [stats, setStats] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const loadStats = React.useCallback(async () => {
    setLoading(true);
    const res = await AdminApiService.getDashboardStats();
    setStats(res);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    loadStats();
  }, [loadStats]);

  const totalProducts = stats?.totalProducts || 0;
  const publishedProducts = stats?.publishedProducts || 0;
  const draftProducts = stats?.draftProducts || 0;
  const totalVariants = stats?.totalVariants || 0;
  const totalAttributes = stats?.totalAttributes || 0;
  const totalCategories = stats?.totalCategories || 0;
  const totalMessages = stats?.totalMessages || 0;
  const lowStockCount = stats?.lowStockCount || 0;

  const recentProducts = stats?.recentProducts || [];
  const recentMessages = stats?.recentMessages || [];
  const lowStockProducts = stats?.lowStockProducts || [];

  return (
    <div className="space-y-6 font-sans selection:bg-black selection:text-white">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-black tracking-tight flex items-center gap-2.5">
            <span>Store Operations Dashboard</span>
            <Badge variant="secondary">Live Real-Time</Badge>
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Real-time overview of catalog, variants, attributes, inquiries, and stock alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => onNavigate('add-product')} variant="default" size="sm">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Product</span>
          </Button>
          <Button onClick={() => onNavigate('categories')} variant="outline" size="sm">
            <FolderTree className="w-3.5 h-3.5 text-rose-500" />
            <span>Add Category</span>
          </Button>
          <Button onClick={() => onNavigate('brands')} variant="outline" size="sm">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            <span>Add Brand</span>
          </Button>
          <Button onClick={() => onNavigate('orders')} variant="outline" size="sm">
            <Plus className="w-3.5 h-3.5 text-emerald-600" />
            <span>Create Order</span>
          </Button>
        </div>
      </div>

      {/* 8 SUMMARY METRIC CARDS GRID WITH SHADCN/UI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Products */}
        <Card 
          onClick={() => onNavigate('products')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Total Products</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-black flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform">
                <Package className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{totalProducts}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-400">Catalog items</CardDescription>
          </CardHeader>
        </Card>

        {/* 2. Total Published Products */}
        <Card 
          onClick={() => onNavigate('products')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-700">Published Live</span>
              <div className="w-7 h-7 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 group-hover:scale-105 transition-transform">
                <Globe className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{publishedProducts}</CardTitle>
            <CardDescription className="text-[11px] text-emerald-600 font-medium">Live on Client Shop</CardDescription>
          </CardHeader>
        </Card>

        {/* 3. Total Draft Products */}
        <Card 
          onClick={() => onNavigate('products')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Draft Products</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-600 flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{draftProducts}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-400">Saved in Admin only</CardDescription>
          </CardHeader>
        </Card>

        {/* 4. Total Product Variants */}
        <Card 
          onClick={() => onNavigate('product-management')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-700">Product Variants</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-black flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform">
                <Layers className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{totalVariants}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-500 font-medium">Color / Size SKUs</CardDescription>
          </CardHeader>
        </Card>

        {/* 5. Total Product Attributes */}
        <Card 
          onClick={() => onNavigate('product-management')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-700">Product Attributes</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-black flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform">
                <Tag className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{totalAttributes}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-500 font-medium">Color, Size, Material...</CardDescription>
          </CardHeader>
        </Card>

        {/* 6. Total Categories */}
        <Card className="hover:border-neutral-300 transition-all">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Categories</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-neutral-700 flex items-center justify-center border border-neutral-200">
                <FolderTree className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{totalCategories}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-400">Active taxonomy groups</CardDescription>
          </CardHeader>
        </Card>

        {/* 7. Total Contact Messages */}
        <Card 
          onClick={() => onNavigate('contact-messages')}
          className="hover:border-neutral-300 transition-all cursor-pointer group"
        >
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-700">Contact Messages</span>
              <div className="w-7 h-7 rounded-md bg-neutral-100 text-black flex items-center justify-center border border-neutral-200 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{totalMessages}</CardTitle>
            <CardDescription className="text-[11px] text-neutral-500 font-medium">Client form inquiries</CardDescription>
          </CardHeader>
        </Card>

        {/* 8. Low Stock Products */}
        <Card className="hover:border-neutral-300 transition-all">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-700">Low Stock Products</span>
              <div className="w-7 h-7 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold mt-1">{lowStockCount}</CardTitle>
            <CardDescription className="text-[11px] text-amber-700 font-medium">&le; 20 units remaining</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* 3 RECENT OVERVIEW TABLES GRID WITH SHADCN/UI CARD & TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table 1: Recent Products (2 Cols) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-black" />
                <span>Recent Products Catalog</span>
              </CardTitle>
              <CardDescription>Latest added inventory items</CardDescription>
            </div>
            <Button 
              onClick={() => onNavigate('products')}
              variant="link"
              size="sm"
              className="p-0 h-auto font-medium text-xs text-black"
            >
              <span>View All Products</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Title</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-black flex items-center gap-2.5">
                      <img src={p.image || p.images?.[0]} alt={p.name} className="w-7 h-7 rounded-md object-cover bg-neutral-100 border border-neutral-200" />
                      <span className="line-clamp-1">{p.name}</span>
                    </TableCell>
                    <TableCell className="font-mono text-neutral-500">{p.sku}</TableCell>
                    <TableCell className="font-semibold text-black">₹{p.price}</TableCell>
                    <TableCell className="font-medium text-neutral-700">{p.stock} units</TableCell>
                    <TableCell>
                      <Badge variant={p.status === 'Published' || p.isPublished ? "success" : "secondary"}>
                        {p.status === 'Published' || p.isPublished ? 'Live' : 'Draft'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Table 2: Recent Contact Messages (1 Col) */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Mail className="w-4 h-4 text-black" />
              <span>Recent Inquiries</span>
            </CardTitle>
            <Button 
              onClick={() => onNavigate('contact-messages')}
              variant="link"
              size="sm"
              className="p-0 h-auto font-medium text-xs text-black"
            >
              <span>Inbox</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-2.5 flex-1">
            {recentMessages.map((msg: any) => (
              <div key={msg.id} className="p-3 rounded-lg bg-neutral-50/70 border border-neutral-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-black">{msg.name}</span>
                  <Badge variant={msg.status === 'New' ? "default" : "secondary"}>
                    {msg.status}
                  </Badge>
                </div>
                <p className="font-medium text-neutral-800 line-clamp-1">{msg.subject}</p>
                <p className="text-[10px] text-neutral-400 font-mono">{msg.date}</p>
              </div>
            ))}
          </CardContent>

          <div className="p-5 pt-0">
            <Button
              onClick={() => onNavigate('contact-messages')}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Open Contact Us Page
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
