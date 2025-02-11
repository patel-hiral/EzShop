import Product from '@/components/product';
import { setLoading, setResolved } from '@/store/slices/uiSlice';
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchProducts = async ({ pageParam = 0 }) => {
  const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pageParam}`);
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};

function Products() {
  const dispatch = useDispatch();
  const observer = useRef();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.flatMap((page) => page.products).length;
      return lastPage.products.length > 0 ? loadedItems : undefined;
    },
  });

  useEffect(() => {
    dispatch(setLoading());
    setTimeout(() => {
      dispatch(setResolved());
    }, 2000);
  }, [data]);

  const lastElementRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return (
    <>
      <ul className="flex justify-center md:justify-evenly flex-wrap gap-5 pb-10">
        {data?.pages.map((page) =>
          page.products.map((product, index) => (
            <Link to={`${product.id}`} key={product.id} ref={index === page.products.length - 1 ? lastElementRef : null}>
              <Product product={product} />
            </Link>
          ))
        )}
      </ul>
      {isFetchingNextPage && <div className='text-center'>Please Wait...</div>}
    </>
  );
}

export default Products;
