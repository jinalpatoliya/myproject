import { CategoryModel } from "../db";

export const getCategoryById = (id) => {
  return new Promise((resolve, reject) => {
    CategoryModel.findOne({
      where: {
        id: id,
      },
    })
      .then((category) => {
        resolve(category);
      })
      .catch((error) => reject(error));
  });
};
export const getCategoryIdByCategorySlug = (categorySlug) => {
    return new Promise((resolve,reject)=>{
        CategoryModel.findOne({
            where:{
                categorySlug:categorySlug,
            },
        })
        .then((category)=>{
            resolve(category.id);
        })
        .catch((error)=>reject(error))
    })
}