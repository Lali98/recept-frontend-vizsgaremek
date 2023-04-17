import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { uuidv4 } from "./EditRecipe";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([[uuidv4(), ""]]);
  const [steps, setSteps] = useState([[uuidv4(), ""]]);
  const [categories, setCategories] = useState([]);
  function fetchCategories() {
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }

  useEffect(() => {
    document.title = "Delicious - Recept feltöltés";
    fetchCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="container main">
        <div className="row" style={{ backgroundColor: "#ffffff66" }}>
          <div className="col-lg-12">
            <h3 className="text-center">Új recept feltöltése</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (e.target.elements.categoriesId.value === "") {
                    alert("Kérem válaszon kategoriát!");
                    return;
                }

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
                 data.append("createUserId", "123456789");

                 let result = await fetch(
                   process.env.REACT_APP_BACKEND_URL + "/api/recipes/create",
                   {
                     method: "POST",
                     body: data,
                   }
                 );
                 let dataJson = await result.json();
                 navigate(`/recept/${dataJson._id}`);
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
                    <option disabled selected value="">---Kérem válaszon---</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
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
                            title={(index + 1) +". hozzávaló törlése"}
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
                                title={(index + 1) +". lépés törlése"}
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
                      title="Lépés hozzáadása"
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
                  <div className="col-lg-12">
                    <input
                      className="form-control"
                      type="file"
                      id="recipeImage"
                      name="recipeImage"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <button className="btn btn-success" type="submit">
                  Mentés
                </button>
                <a className="btn btn-danger ms-2" href={`/`}>
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

export default Upload;
