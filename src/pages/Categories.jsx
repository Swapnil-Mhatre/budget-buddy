import { useContext, useState } from "react";
import "../css/category.css";
import { MdAdd, MdAddCircleOutline } from "react-icons/md";
import { CategoryCard } from "../Components/CardLayout";
import { ExpenseContextData } from "../Context/ExpenseContext";
import CategoryForm from "../Components/CategoryForm";
import { UIContextData } from "../Context/UIContext";

const Categories = () => {
  const {
    categoryType,
    categoriesList,
    setCategoryType,
    deleteCustomCategory,
  } = useContext(ExpenseContextData);
  const { width } = useContext(UIContextData);
  const [formIsOpen, setFormIsOpen] = useState(false);

  function changeCategory(e) {
    const categoryName = e.target.textContent.split(" ")[0];
    setCategoryType(categoryName);
  }

  return (
    <section className="category">
      <div className="summary">
        <div className="buttons-div">
          <button
            onClick={changeCategory}
            className={categoryType === "expense" ? "active" : ""}
          >
            expense Categories
          </button>
          <button
            onClick={changeCategory}
            className={categoryType === "income" ? "active" : ""}
          >
            income Categories
          </button>
        </div>
        {width > 426 && (
          <button
            onClick={() => setFormIsOpen(true)}
            className="add-category-button"
          >
            <MdAdd className="custom" />
            Add Category
          </button>
        )}
      </div>
      <div className="category-list">
        {categoriesList
          .filter((category) => category.type === categoryType)
          .map((category, idx) => (
            <CategoryCard
              fnc={() => deleteCustomCategory(category.id)}
              category={category}
              key={category.id || idx}
            />
          ))}
      </div>
      <div className="add-category-box">
        <button onClick={() => setFormIsOpen(true)}>
          <MdAddCircleOutline />
          <div>
            <strong>Add New Category</strong>
            <p>Create a custom category</p>
          </div>
        </button>
      </div>
      {formIsOpen && <CategoryForm closeModal={() => setFormIsOpen(false)} />}
    </section>
  );
};

export default Categories;
