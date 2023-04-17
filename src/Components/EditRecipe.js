import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function EditRecipe() {
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);

  function fetchRecipe() {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/recipes/" + recipeId)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        setIngredients(
          data.ingredients.map((ingredient) => [uuidv4(), ingredient])
        );
        setSteps(data.steps.map((step) => [uuidv4(), step]));
        document.title = `"${data.name}" szerkeztése - Delicious`;
      });
  }

  const [categories, setCategories] = useState([]);
  function fetchCategories() {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <>
      <Header />
      <div className="container main">
        <div className="row" style={{ backgroundColor: "#ffffff66" }}>
          <div className="col-lg-12">
            <h3 className="text-center">Recept szerkeztése</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // console.log(e.target.elements.name.value);
                const data = new FormData();
                data.append("name", e.target.elements.name.value);
                data.append("description", e.target.elements.description.value);
                data.append(
                  "categoriesId",
                  e.target.elements.categoriesId.value
                );
                ingredients.forEach((ingredient) => {
                  data.append("ingredients[]", ingredient[1]);
                });
                steps.forEach((step) => {
                  data.append("steps[]", step[1]);
                });
                data.append(
                  "recipeImage",
                  e.target.elements["recipeImage"].files[0]
                );

                await fetch(
                  process.env.REACT_APP_BACKEND_URL +
                    "/api/recipes/" +
                    recipeId,
                  {
                    method: "PUT",
                    body: data,
                  }
                );
                await fetchRecipe();
                navigate(`/recept/${recipeId}`);

                // console.log(JSON.stringify(Array3dtoArray2d(ingredients)));
              }}
            >
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Étel neve
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder={recipe.name}
                  defaultValue={recipe.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Leírás
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="6"
                  defaultValue={recipe.description}
                  placeholder={recipe.description}
                  maxLength='898'
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="categoriesId" className="form-label">
                  Kategoria
                </label>
                <select
                  className="form-select"
                  id="categoriesId"
                  name="categoriesId"
                >
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      selected={category._id === recipe.categoriesId}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ingredients" className="form-label">
                  Hozzávalok:
                </label>
                {ingredients.map(([ingredientId, ingredient], index) => (
                  <div key={ingredientId} className="offset-lg-1">
                    <div
                      className={
                        "row mb-3 " +
                        (index === ingredients.length - 1
                          ? ""
                          : "border-botton")
                      }
                    >
                      <div className="col-lg-10">
                        <input
                          type="text"
                          name={"ingredient-" + { index }}
                          className="form-control"
                          placeholder={ingredient}
                          value={ingredient}
                          onChange={(event) => {
                            const { value } = event.target;
                            setIngredients((prev) => {
                              const ret = [...prev];
                              ret[index] = [ingredientId, value];
                              return ret;
                            });
                          }}
                        />
                      </div>
                      <div className="col-lg-2">
                        <div className="">
                          <button
                            className="btn btn-danger mb-3"
                            type="button"
                            onClick={() => {
                              setIngredients((prev) => {
                                const ret = [...prev];
                                ret.splice(
                                  prev.findIndex(([id]) => id === ingredientId),
                                  1
                                );
                                return ret;
                              });
                            }}
                            //TODO: Title hozzá adása
                          >
                            <DeleteOutlineIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="row w-100">
                  <div className="col-lg-2 offset-lg-10">
                    <button
                      type="button"
                      className="btn btn-success btn-sm float-right"
                      onClick={() => {
                        setIngredients((prev) => [...prev, [uuidv4(), ""]]);
                      }}
                      title="Hozzávaló hozzáadása"
                    >
                      <AddOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="steps" className="form-label">
                  Lépések:
                </label>
                <ol>
                  {steps.map(([stepId, step], index) => (
                    <li className="ms-2" key={index}>
                      <div key={stepId} className="ms-3">
                        <div
                          className={
                            "row mb-3 " +
                            (index === steps.length - 1 ? "" : "border-botton")
                          }
                        >
                          <div className="col-md-10">
                            <textarea
                              name={"step-" + { index }}
                              className="form-control"
                              placeholder={step}
                              defaultValue={step}
                              rows="3"
                              onChange={(event) => {
                                const { value } = event.target;
                                setSteps((prev) => {
                                  const ret = [...prev];
                                  ret[index] = [stepId, value];
                                  return ret;
                                });
                              }}
                            />
                          </div>
                          <div className="col-md-2">
                            <div className="w-100">
                              <button
                                className="btn btn-danger mb-3"
                                type="button"
                                onClick={() => {
                                  setSteps((prev) => {
                                    const ret = [...prev];
                                    ret.splice(
                                      prev.findIndex(([id]) => id === stepId),
                                      1
                                    );
                                    return ret;
                                  });
                                }}
                              >
                                <DeleteOutlineIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="row w-100">
                  <div className="col-lg-2 offset-lg-10">
                    <button
                      type="button"
                      className="btn btn-success btn-sm float-right"
                      onClick={() => {
                        setSteps((prev) => [...prev, [uuidv4(), ""]]);
                      }}
                    >
                      <AddOutlinedIcon />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Fénykép hozzáadás:
                </label>
                <div className="row">
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="file"
                      id="recipeImage"
                      name="recipeImage"
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="mb-2">
                      Jelenleg ez a kép van feltöltve:
                    </label>
                    {recipe.imageUrl === "" ? (
                      <p className="fw-bold text-danger">
                        Nincs még feltőltve kép!
                      </p>
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/static/images/${recipe.imageUrl}`}
                        alt={recipe.name}
                        className="w-75"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <button className="btn btn-success" type="submit">
                  Mentés
                </button>
                <a className="btn btn-danger ms-2" href={`/recept/${recipeId}`}>
                  Mégsem
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditRecipe;
