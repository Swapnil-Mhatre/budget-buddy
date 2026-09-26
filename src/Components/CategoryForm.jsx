import { useContext, useState } from "react";
import {
  MdRestaurant,
  MdDirectionsCar,
  MdShoppingBag,
  MdReceipt,
  MdMovie,
  MdHealthAndSafety,
  MdSchool,
  MdHome,
  MdWork,
  MdPets,
  MdFitnessCenter,
  MdFlight,
  MdCardGiftcard,
  MdSubscriptions,
  MdMoreHoriz,
  MdClose,
} from "react-icons/md";
import { ExpenseContextData } from "../context/ExpenseContext";
import { InputButton } from "./CustomButtons";
import { Selector } from "./CustomDropdown";

const icons = [
  {
    id: "restaurant",
    icon: MdRestaurant,
    label: "Food",
  },
  {
    id: "car",
    icon: MdDirectionsCar,
    label: "Transport",
  },
  {
    id: "shopping",
    icon: MdShoppingBag,
    label: "Shopping",
  },
  {
    id: "receipt",
    icon: MdReceipt,
    label: "Bills",
  },
  {
    id: "movie",
    icon: MdMovie,
    label: "Entertainment",
  },
  {
    id: "health",
    icon: MdHealthAndSafety,
    label: "Health",
  },
  {
    id: "school",
    icon: MdSchool,
    label: "Education",
  },
  {
    id: "home",
    icon: MdHome,
    label: "Home",
  },
  {
    id: "work",
    icon: MdWork,
    label: "Work",
  },
  {
    id: "pets",
    icon: MdPets,
    label: "Pets",
  },
  {
    id: "fitness",
    icon: MdFitnessCenter,
    label: "Fitness",
  },
  {
    id: "flight",
    icon: MdFlight,
    label: "Travel",
  },
  {
    id: "gift",
    icon: MdCardGiftcard,
    label: "Gift",
  },
  {
    id: "subscription",
    icon: MdSubscriptions,
    label: "Subscription",
  },
  {
    id: "other",
    icon: MdMoreHoriz,
    label: "Other",
  },
];

const colors = [
  "purple",
  "blue",
  "green",
  "orange",
  "red",
  "pink",
  "yellow",
  "indigo",
  "gray",
  "teal",
];

const AddCategory = ({ closeModal }) => {
  const {
    categoryType,
    setCategoryType,
    customCategories,
    setCustomCategories,
  } = useContext(ExpenseContextData);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("restaurant");
  const [IconColor, setIconColor] = useState("purple");

  function handleSubmit(e) {
    e.preventDefault();
    if (!categoryName.trim()) return;
    const newCategory = {
      id: crypto.randomUUID(),
      value: categoryName,
      type: categoryType,
      icon: selectedIcon,
      color: IconColor,
      transactions: 0,
      total: 0,
    };
    setCustomCategories([...customCategories, newCategory]);
    closeModal();
  }

  return (
    <div className="modal-overlay">
      <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div>
            <h2>Add Category</h2>
            <p>Create your own expense or income category.</p>
          </div>
          <button type="button" className="close-btn" onClick={closeModal}>
            <MdClose />
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="category-name">Category Name</label>
          <input
            id="category-name"
            type="text"
            placeholder="e.g. Pet Care"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category Type</label>
          <div className="type">
            <InputButton
              text={"expense"}
              style={categoryType === "expense" ? "red" : ""}
              fnc={() => setCategoryType("expense")}
            />
            <InputButton
              text={"income"}
              style={categoryType === "income" ? "green" : ""}
              fnc={() => setCategoryType("income")}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Choose Color</label>
          <Selector
            selectedVal={IconColor}
            options={colors}
            fnc={(e) => setIconColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Choose Icon</label>
          <div className="grid-icon">
            {icons.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={
                    selectedIcon === item.id ? "icon-box selected" : "icon-box"
                  }
                  onClick={() => setSelectedIcon(item.id)}
                  title={item.label}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="preview-section">
          <span>Preview</span>
          <div className="preview-card">
            {(() => {
              const current = icons.find((item) => item.id === selectedIcon);
              const PreviewIcon = current.icon;
              return <PreviewIcon className={IconColor} />;
            })()}
            <div>
              <strong>{categoryName || "Category Name"}</strong>
              <p>{categoryType}</p>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button type="submit" className="submit-btn">
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
