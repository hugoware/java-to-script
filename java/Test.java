public class ArtSet extends ArrayList {
  // // HashMap map;
  // public ArtSet(int a, boolean c) {
  //   super(10, 10);
  // }
  
  public ArtSet()
  {
    this.map = new HashMap();
  }
  
  // public ArtSet(ExtendedList artObjects)
  // {
  //   this();
  //   addAll(artObjects);
  // }
  
  // public ArtSet(Object[] artObjects)
  // {
  //   this(Lists.asList(artObjects));
  // }
  
  // public Art getArt(int index)
  // {
  //   return (Art)get(index);
  // }
  
  // public Object add(int index, Object art)
  // {
  //   if (((art instanceof Art)) && 
  //     (this.map.get(art) == null) && 
  //     (super.add(index, art) != null))
  //   {
  //     this.map.put(art, art);
  //     return art;
  //   }
  //   return null;
  // }
  
  // public Object remove(int index)
  // {
  //   Object obj = super.remove(index);
  //   if (obj != null) {
  //     this.map.remove(obj);
  //   }
  //   return obj;
  // }
  
  // public boolean contains(Object element)
  // {
  //   return this.map.get(element) != null;
  // }
  
  // public native ArtSet invert();
  
  // public native Raster rasterize(int paramInt1, float paramFloat1, int paramInt2, float paramFloat2, float paramFloat3);
  
  // public Raster rasterize(int type, float resolution, int antialiasing)
  // {
  //   return rasterize(type, resolution, antialiasing, -1.0F, -1.0F);
  // }
  
  // public Raster rasterize(int type)
  // {
  //   return rasterize(type, 0.0F, 4, -1.0F, -1.0F);
  // }
  
  // public Raster rasterize()
  // {
  //   return rasterize(-1, 0.0F, 4, -1.0F, -1.0F);
  // }
  
  // public String toString()
  // {
  //   StringBuffer buffer = new StringBuffer();
  //   buffer.append("[");
  //   for (int i = 0; i < size(); i++)
  //   {
  //     if (i > 0) {
  //       buffer.append(", ");
  //     }
  //     buffer.append(get(i).toString());
  //   }
  //   buffer.append("]");
  //   return buffer.toString();
  // }
}
