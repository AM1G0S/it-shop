import React, { useEffect, useState } from "react";
import Modal from "../../components/ui/Modal/Modal";
import Title from "../../components/ui/Title/Title";
import SearchIcon from "../../components/icons/SearchIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchProducts } from "../../store/products/asyncProductActions";
import { fetchCategories } from "../../store/categories/asyncCategoryActions";

const TestPage = () => {
  const dispatch = useAppDispatch();
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const isLoadingCategories = useAppSelector(
    (state) => state.category.isLoading
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isLoadingCategories) {
    return <div>Идёт загрузка категорий...</div>;
  }

  return (
    <div>
      <Title>🐺 Тестовая страничка</Title>

      <button onClick={() => setIsVisibleModal((prev) => !prev)}>
        показать модалку
      </button>

      <Modal isOpen={isVisibleModal} setIsOpen={setIsVisibleModal}>
        <SearchIcon />
        <h1>modal window</h1>
        <button onClick={() => setIsVisibleModal(false)}>close</button>
      </Modal>
    </div>
  );
};

export default TestPage;
