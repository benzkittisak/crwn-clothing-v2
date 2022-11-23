import CategoryItem from "../category-item/category-item.component";

import './directory.styles.scss';

const Directory = ({categories}) => {
  
  return (
    <div className="directory-container">
      {categories
        ? categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))
        : null}
    </div>
  );
};

export default Directory;
