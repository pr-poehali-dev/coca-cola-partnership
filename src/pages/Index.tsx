import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  volume: string;
  tags: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface Bundle {
  id: number;
  name: string;
  description: string;
  products: number[];
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Апельсиновый фреш',
    category: 'Соки',
    price: 250,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/b340dae3-b25a-4e88-b3db-292f53b6e184.jpg',
    description: 'Свежевыжатый апельсиновый сок',
    volume: '500 мл',
    tags: ['цитрус', 'витамин C', 'энергия']
  },
  {
    id: 2,
    name: 'Зелёный смузи',
    category: 'Смузи',
    price: 320,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/c2320e20-bb10-4584-90bd-44b4155b1322.jpg',
    description: 'Смузи из шпината, яблока и банана',
    volume: '400 мл',
    tags: ['детокс', 'витамины', 'энергия']
  },
  {
    id: 3,
    name: 'Манго-маракуйя',
    category: 'Соки',
    price: 280,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/b340dae3-b25a-4e88-b3db-292f53b6e184.jpg',
    description: 'Тропический микс манго и маракуйи',
    volume: '500 мл',
    tags: ['тропик', 'экзотика', 'витамины']
  },
  {
    id: 4,
    name: 'Ягодный смузи',
    category: 'Смузи',
    price: 300,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/c2320e20-bb10-4584-90bd-44b4155b1322.jpg',
    description: 'Смузи из клубники, черники и малины',
    volume: '400 мл',
    tags: ['ягоды', 'антиоксиданты', 'витамины']
  },
  {
    id: 5,
    name: 'Грейпфрутовый фреш',
    category: 'Соки',
    price: 260,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/b340dae3-b25a-4e88-b3db-292f53b6e184.jpg',
    description: 'Свежевыжатый грейпфрутовый сок',
    volume: '500 мл',
    tags: ['цитрус', 'витамин C', 'бодрость']
  },
  {
    id: 6,
    name: 'Протеиновый смузи',
    category: 'Смузи',
    price: 350,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/c2320e20-bb10-4584-90bd-44b4155b1322.jpg',
    description: 'Банан, арахисовая паста, протеин',
    volume: '450 мл',
    tags: ['протеин', 'спорт', 'энергия']
  }
];

const bundles: Bundle[] = [
  {
    id: 1,
    name: 'Энергия утра',
    description: 'Идеальный старт дня: апельсиновый фреш и зелёный смузи',
    products: [1, 2],
    originalPrice: 570,
    discountedPrice: 490,
    discount: 14,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/18adb2b0-0ab1-48e9-8d6b-05f19dcd49c2.jpg'
  },
  {
    id: 2,
    name: 'Цитрусовый микс',
    description: 'Тройная порция витамина C: апельсин, грейпфрут и манго-маракуйя',
    products: [1, 3, 5],
    originalPrice: 790,
    discountedPrice: 650,
    discount: 18,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/b340dae3-b25a-4e88-b3db-292f53b6e184.jpg'
  },
  {
    id: 3,
    name: 'Спорт и здоровье',
    description: 'Для активных: протеиновый и ягодный смузи',
    products: [4, 6],
    originalPrice: 650,
    discountedPrice: 550,
    discount: 15,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/c2320e20-bb10-4584-90bd-44b4155b1322.jpg'
  },
  {
    id: 4,
    name: 'Детокс-неделя',
    description: 'Комплекс на неделю: все соки и смузи',
    products: [1, 2, 3, 4, 5, 6],
    originalPrice: 1760,
    discountedPrice: 1400,
    discount: 20,
    image: 'https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/18adb2b0-0ab1-48e9-8d6b-05f19dcd49c2.jpg'
  }
];

const categories = ['Все напитки', 'Соки', 'Смузи'];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все напитки');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
    deliveryTime: 'asap',
    paymentMethod: 'card'
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addBundleToCart = (bundle: Bundle) => {
    bundle.products.forEach(productId => {
      const product = products.find(p => p.id === productId);
      if (product) {
        addToCart(product);
      }
    });
  };

  const getRecommendations = (product: Product) => {
    return products.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || p.tags.some(tag => product.tags.includes(tag)))
    ).slice(0, 3);
  };

  const filteredProducts = selectedCategory === 'Все напитки'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Droplet" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-primary">FreshDrink</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
            <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors">Блог</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, -1)}>
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="text-sm">{item.quantity}</span>
                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, 1)}>
                              <Icon name="Plus" size={12} />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-6 w-6 ml-auto" onClick={() => removeFromCart(item.id)}>
                              <Icon name="Trash2" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Товары:</span>
                        <span>{getTotalPrice()} ₽</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Доставка:</span>
                        <span>{getTotalPrice() >= 1000 ? 'Бесплатно' : '150 ₽'}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Итого:</span>
                        <span>{getTotalPrice() + (getTotalPrice() >= 1000 ? 0 : 150)} ₽</span>
                      </div>
                      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full" size="lg">
                            Оформить заказ
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Оформление заказа</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">Имя *</Label>
                                <Input
                                  id="name"
                                  placeholder="Иван Иванов"
                                  value={orderForm.name}
                                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">Телефон *</Label>
                                <Input
                                  id="phone"
                                  placeholder="+7 (999) 123-45-67"
                                  value={orderForm.phone}
                                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="address">Адрес доставки *</Label>
                                <Input
                                  id="address"
                                  placeholder="ул. Пушкина, д. 10, кв. 5"
                                  value={orderForm.address}
                                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="deliveryTime">Время доставки</Label>
                                <Select value={orderForm.deliveryTime} onValueChange={(value) => setOrderForm({...orderForm, deliveryTime: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="asap">Как можно скорее (60 мин)</SelectItem>
                                    <SelectItem value="morning">Утром (9:00 - 12:00)</SelectItem>
                                    <SelectItem value="afternoon">Днём (12:00 - 17:00)</SelectItem>
                                    <SelectItem value="evening">Вечером (17:00 - 21:00)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="paymentMethod">Способ оплаты</Label>
                                <Select value={orderForm.paymentMethod} onValueChange={(value) => setOrderForm({...orderForm, paymentMethod: value})}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="card">Картой онлайн</SelectItem>
                                    <SelectItem value="cash">Наличными курьеру</SelectItem>
                                    <SelectItem value="card_courier">Картой курьеру</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="comment">Комментарий к заказу</Label>
                                <Textarea
                                  id="comment"
                                  placeholder="Например: позвоните за 5 минут до приезда"
                                  value={orderForm.comment}
                                  onChange={(e) => setOrderForm({...orderForm, comment: e.target.value})}
                                  rows={3}
                                />
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-semibold mb-4">Ваш заказ</h3>
                              <div className="space-y-3 mb-4">
                                {cart.map(item => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span className="font-medium">{item.price * item.quantity} ₽</span>
                                  </div>
                                ))}
                              </div>
                              <Separator className="my-4" />
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Товары:</span>
                                  <span>{getTotalPrice()} ₽</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Доставка:</span>
                                  <span>{getTotalPrice() >= 1000 ? 'Бесплатно' : '150 ₽'}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold text-lg">
                                  <span>Итого:</span>
                                  <span>{getTotalPrice() + (getTotalPrice() >= 1000 ? 0 : 150)} ₽</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full" 
                              size="lg"
                              disabled={!orderForm.name || !orderForm.phone || !orderForm.address}
                              onClick={() => {
                                alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
                                setIsOrderDialogOpen(false);
                                setCart([]);
                                setOrderForm({
                                  name: '',
                                  phone: '',
                                  address: '',
                                  comment: '',
                                  deliveryTime: 'asap',
                                  paymentMethod: 'card'
                                });
                              }}
                            >
                              <Icon name="CheckCircle" size={18} className="mr-2" />
                              Подтвердить заказ
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Свежие напитки с&nbsp;доставкой
              </h2>
              <p className="text-xl text-muted-foreground">
                100% натуральные соки и смузи из свежих фруктов и овощей. Доставка за 60 минут.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-lg px-8" onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                  В каталог
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://cdn.poehali.dev/projects/dc5fb2cd-b32f-413c-be37-c4585aaab84b/files/18adb2b0-0ab1-48e9-8d6b-05f19dcd49c2.jpg"
                alt="Свежие напитки"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 text-sm px-4 py-2">Выгодные предложения</Badge>
            <h2 className="text-4xl font-bold mb-4">Готовые наборы</h2>
            <p className="text-muted-foreground text-lg">Популярные комбинации напитков со скидкой до 20%</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {bundles.map(bundle => (
              <Card key={bundle.id} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative h-48 md:h-full overflow-hidden rounded-lg">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                      -{bundle.discount}%
                    </Badge>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
                      <p className="text-muted-foreground mb-4">{bundle.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {bundle.products.map(productId => {
                          const product = products.find(p => p.id === productId);
                          return product ? (
                            <Badge key={productId} variant="outline" className="text-xs">
                              {product.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold text-primary">{bundle.discountedPrice} ₽</span>
                        <span className="text-lg text-muted-foreground line-through">{bundle.originalPrice} ₽</span>
                      </div>
                      <Button className="w-full" size="lg" onClick={() => addBundleToCart(bundle)}>
                        <Icon name="ShoppingBag" size={18} className="mr-2" />
                        Добавить набор
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог напитков</h2>
          
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="px-6"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden bg-secondary/50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4">{product.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                      <p className="text-sm text-muted-foreground">{product.volume}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button className="flex-1" onClick={() => addToCart(product)}>
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => setSelectedProduct(product)}>
                        <Icon name="Eye" size={16} />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      {selectedProduct && (
                        <>
                          <SheetHeader>
                            <SheetTitle>{selectedProduct.name}</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6 space-y-6">
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-full rounded-lg"
                            />
                            <div>
                              <p className="text-3xl font-bold text-primary mb-2">{selectedProduct.price} ₽</p>
                              <p className="text-muted-foreground mb-4">{selectedProduct.volume}</p>
                              <p className="mb-4">{selectedProduct.description}</p>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProduct.tags.map(tag => (
                                  <Badge key={tag} variant="secondary">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <Button className="w-full" size="lg" onClick={() => addToCart(selectedProduct)}>
                                <Icon name="ShoppingCart" size={16} className="mr-2" />
                                Добавить в корзину
                              </Button>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Похожие напитки</h3>
                              <div className="space-y-4">
                                {getRecommendations(selectedProduct).map(rec => (
                                  <Card key={rec.id} className="overflow-hidden">
                                    <div className="flex gap-4 p-4">
                                      <img src={rec.image} alt={rec.name} className="w-20 h-20 object-cover rounded" />
                                      <div className="flex-1">
                                        <h4 className="font-medium mb-1">{rec.name}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                                        <div className="flex items-center justify-between">
                                          <span className="font-bold text-primary">{rec.price} ₽</span>
                                          <Button size="sm" variant="outline" onClick={() => addToCart(rec)}>
                                            <Icon name="Plus" size={14} />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </SheetContent>
                  </Sheet>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы наших клиентов</h2>
            <p className="text-muted-foreground text-lg">Более 5000 довольных покупателей</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">А</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Анна Петрова</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">2 недели назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Заказываю напитки регулярно! Особенно нравится зелёный смузи — идеально для завтрака. 
                Доставка всегда вовремя, курьеры вежливые. Рекомендую!
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">М</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Михаил Соколов</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">1 месяц назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Взял набор "Спорт и здоровье" — отличное сочетание! Протеиновый смузи после тренировки просто спасение. 
                Качество напитков на высоте, всё свежее.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">Е</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Елена Краснова</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">3 дня назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Заказала "Детокс-неделю" — хватило на всю семью! Цены адекватные, скидки приятные. 
                Особенно понравился апельсиновый фреш — как будто сами выжали.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">Д</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Дмитрий Волков</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">1 неделя назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Удивлён скоростью доставки! Заказал в 10 утра, привезли через 45 минут. 
                Упаковка качественная, ничего не пролилось. Буду заказывать ещё.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">О</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Ольга Морозова</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">5 дней назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Попробовала манго-маракуйю — влюбилась с первого глотка! Теперь заказываю каждую неделю. 
                Ребёнку тоже очень нравится ягодный смузи.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-primary">С</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Сергей Николаев</h4>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">2 месяца назад</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Отличный сервис для офиса! Заказываем наборы для всей команды. 
                Все довольны, цены справедливые, доставка чёткая. Советую всем!
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-8 p-6 bg-background rounded-lg shadow-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">5000+</div>
                <p className="text-sm text-muted-foreground">Довольных клиентов</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">4.9</div>
                <div className="flex gap-1 justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Средняя оценка</p>
              </div>
              <Separator orientation="vertical" className="h-12" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-1">98%</div>
                <p className="text-sm text-muted-foreground">Рекомендуют нас</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <Icon name="Clock" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставим ваш заказ за 60 минут</p>
            </Card>
            <Card className="text-center p-8">
              <Icon name="CreditCard" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
              <p className="text-muted-foreground">Онлайн или наличными курьеру</p>
            </Card>
            <Card className="text-center p-8">
              <Icon name="Package" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Бесплатно от 1000₽</h3>
              <p className="text-muted-foreground">При заказе от 1000 рублей</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Droplet" className="text-primary" size={24} />
                <span className="font-bold text-lg">FreshDrink</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Свежие натуральные напитки с доставкой по городу
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#catalog" className="hover:text-primary transition-colors">Каталог</a></li>
                <li><a href="#delivery" className="hover:text-primary transition-colors">Доставка</a></li>
                <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">О компании</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#blog" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#contacts" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@freshdrink.ru
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-8" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 FreshDrink. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}