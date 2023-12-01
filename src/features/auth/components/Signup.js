import { Link, Navigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { MoonLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInUser,
  createUserAsync,
  selectStatus,
  selectErrors,
  setErrorToNull,
} from "../authSlice";
import { useEffect, useState } from "react";

function SignUp() {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectErrors);
  const user = useSelector(selectLoggedInUser);
  const [page, SetPage] = useState(1);
  const [isValid, SetIsValid] = useState(true);
  const [name, SetName] = useState("");
  const [gender, SetGender] = useState("");
  const [age, SetAge] = useState(0);
  const [providedInterests,SetProvidedInterests] = useState([
    "Software Development",
    "Data Science",
    "Web Development",
    "Artificial Intelligence (AI)",
    "Cybersecurity",
    "Entrepreneurship",
    "Project Management",
    "Financial Technology (FinTech)",
    "Digital Marketing",
    "Supply Chain Management",
    "Natural Language Processing",
    "Computer Vision",
    "Network Security",
    "Agile Methodology",
    "Logistics and Distribution",
  ]);
  const [opacity, SetOpacity] = useState("");
  const [BSField, SetBSField] = useState("");
  const [BSUni, SetBSUni] = useState("");
  const [MSField, SetMSField] = useState("");
  const [MSUni, SetMSUni] = useState("");
  const [userinterests, SetUserInterests] = useState([]);
  const [interestError, SetInterestError] = useState("");
  const [newInterest,SetNewInterest]=useState('');
  const [imageBuffer,SetImage]=useState();
  const [postImage,SetPostImage]=useState({myFile:""})
  useEffect(() => {
    dispatch(setErrorToNull());
  }, []);
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const handlePrevious = (page) => {
    SetPage(page - 1);
  };
  const handleNext = (page) => {
    if (page === 1) {
      SetIsValid(true);
      if (name === "") {
        setError("Name", { type: "required", message: "Name is required" });
        SetIsValid(false);
      } else if (age === 0) {
        setError("Name", {});
        setError("Age", { type: "required", message: "Age is required" });
        SetIsValid(false);
      } else if (gender === "") {
        setError("Name", {});
        setError("Age", {});
        setError("Gender", { type: "required", message: "Gender is required" });
        SetIsValid(false);
      }
       else {
        setError("Name", {});
        setError("Age", {});
        setError("Gender", {});
       
        SetPage(2);
      }
    }
    if (page === 2) {
      if (userinterests.length === 0) {
        SetInterestError("Please add atleast 1 interest.");
      } else if (userinterests.length > 5) {
        SetInterestError("You can add a maximum of 5 interests.");
      } else {
        SetInterestError("");
        SetPage(3);
      }
    }
  };

  const pushInterest = (interest) => {
    const interestIndex = userinterests.indexOf(interest);

    if (interestIndex === -1) {
      // Add the interest to the array
      SetUserInterests([...userinterests, interest]);
      SetOpacity("bg-black");
    } else {
      // Remove the interest from the array
      const updatedInterests = [...userinterests];
      updatedInterests.splice(interestIndex, 1);
      SetUserInterests(updatedInterests);
      SetOpacity("");
    }
  };

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleAddNewInterest=()=>{
    SetUserInterests([...userinterests,newInterest]);
    SetProvidedInterests([...providedInterests,newInterest])
    SetNewInterest(prevInterest=>'');
  }
  const handleKeyDown=(e)=>{
    if(e.key=='Enter'){
      handleAddNewInterest();
    }
  }
  const HandleUpload=async(e)=>{
    const file=e.target.files[0];
    if(file){
    const base64=await convertToBase64(file);
    SetImage(base64);
    }
   }
  useEffect(() => {
    console.log(userinterests);
  }, [userinterests]);

  return (
    <>
      {user && <Navigate to="/home" replace={true} />}
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-Auth-0 font-signature">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="h-60 w-60 ml-20 -mt-6"
            src="/NowOpen-removebg-preview.png"
            alt="Your Company"
          />
          <h2 className="-mt-20 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up to your Account
          </h2>
          {error ? (
            <h4 className="text-red-700 text-center pt-4">{error}</h4>
          ) : null}
        </div>

        {/* <div className="flex flex-row justify-center mt-6">
          <div class=" w-2/6 bg-white rounded-full h-1.5 mb-4">
            <div
              class="bg-green-600 h-1.5 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div> */}

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-full">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              dispatch(
                createUserAsync({
                  name: data.Name,
                  username: data.Username,
                  email: data.email,
                  password: data.password,
                  age: data.Age,
                  gender: data.Gender,
                  bsField: BSField,
                  msField: MSField,
                  bsUni: BSUni,
                  msUni: MSUni,
                  interest: userinterests,
                  image:imageBuffer,
                })
              );
            })}
          >
            {page === 1 && (
              <>
                <h4 className="flex justify-center w-full text-xl">
                  Personal Information
                </h4>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="Name"
                      {...register("Name", {
                        required: "Name Required",
                      })}
                      type="Name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetName(e.target.value)}
                    />
                    {errors.Name && (
                      <p className="text-red-500">{errors.Name.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Age"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Age
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="Age"
                      {...register("Age", {
                        required: "Age Required",
                      })}
                      type="Age"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetAge(e.target.value)}
                    />
                    {errors.Age && (
                      <p className="text-red-500">{errors.Age.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Gender
                    </label>
                  </div>
                  <div className="mt-2">
                    <select
                      id="Gender"
                      {...register("Gender", {
                        required: "Gender Required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>

                    {errors.Gender && (
                      <p className="text-red-500">{errors.Gender.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                    <label
                      htmlFor="Image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                  </div>
                <div className="mt-2">
                    <input
                      id="Image"
                      {...register("Image", {
                        required: "Image Required",
                      })}
                      type="file"
                      accept="image/*"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => HandleUpload(e)}
                    />
                    {errors.Image && (
                      <p className="text-red-500">{errors.Image.message}</p>
                    )}
                  </div>


                <button
                  className="flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => handleNext(1)}
                  type="button"
                >
                  Next
                </button>
              </>
            )}
            {page == 2 && (
              <>
                <h4 className="flex justify-center w-full text-xl">
                  Education and Interests
                </h4>
                <h4 className=" w-full">
                  Bachelors <span className="text-xs">(optional)</span>:
                </h4>
                <div className="ring ring-AuthBtn-0 bg-AuthBtn-0 p-4 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between text-sm">
                    <label
                      htmlFor="BSField"
                      className="block text-xs text-white font-medium leading-6 text-gray-900"
                    >
                      Field of Study :
                    </label>
                  </div>
                  <div className="mt-2 mb-5">
                    <select
                      id="BSField"
                      {...register("BSField", {})}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetBSField(e.target.value)}
                    >
                      <option value="">Select Field</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Chemical Engineering">
                        Chemical Engineering
                      </option>
                      <option value="Biology">Biology</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Physics">Physics</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Business Administration">
                        Business Administration
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Sociology">Sociology</option>
                      <option value="Communications">Communications</option>
                      <option value="Journalism">Journalism</option>
                      <option value="Political Science">
                        Political Science
                      </option>
                      <option value="History">History</option>
                      <option value="English">English</option>
                      <option value="English">others</option>
                    </select>

                    {errors.BSField && (
                      <p className="text-red-500">{errors.BSField.message}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="BSUni"
                      className="block text-xs font-medium leading-6 text-gray-900 text-white"
                    >
                      University :
                    </label>
                  </div>
                  <div className="my-2">
                    <input
                      id="BSUni"
                      {...register("BSUni", {})}
                      type="BSUni"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetBSUni(e.target.value)}
                    />
                    {errors.BSUni && (
                      <p className="text-red-500">{errors.BSUni.message}</p>
                    )}
                  </div>
                </div>
                <h4 className=" w-full ">
                  Masters <span className="text-xs">(optional)</span>:
                </h4>
                <div className="ring ring-AuthBtn-0 bg-AuthBtn-0 p-4 rounded-lg shadow-xl">
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="MSField"
                      className="block text-xs font-medium leading-6 text-gray-900 text-white"
                    >
                      Field of Study :
                    </label>
                  </div>
                  <div className="mt-2 mb-5">
                    <select
                      id="MSField"
                      {...register("MSField", {})}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetMSField(e.target.value)}
                    >
                      <option value="">Select Field</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Artificial Intelligence">
                        Artificial Intelligence
                      </option>
                      <option value="Data Science">Data Science</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Software Engineering">
                        Software Engineering
                      </option>
                      <option value="Information Systems">
                        Information Systems
                      </option>
                      <option value="Computer Networks">
                        Computer Networks
                      </option>
                      <option value="Database Management">
                        Database Management
                      </option>
                      <option value="Human-Computer Interaction">
                        Human-Computer Interaction
                      </option>
                      <option value="Robotics">Robotics</option>
                      <option value="Bioinformatics">Bioinformatics</option>
                      <option value="Computational Linguistics">
                        Computational Linguistics
                      </option>

                      <option value="Business Administration">
                        Business Administration
                      </option>
                      <option value="Economics">Economics</option>
                      <option value="Psychology">Psychology</option>
                      <option value="Sociology">Sociology</option>
                      <option value="Communications">Communications</option>
                      <option value="Journalism">Journalism</option>
                      <option value="Political Science">
                        Political Science
                      </option>
                      <option value="History">History</option>
                      <option value="English">English</option>
                      <option value="English">others</option>
                    </select>

                    {errors.MSField && (
                      <p className="text-red-500">{errors.MSField.message}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <label
                      htmlFor="MSUni"
                      className="block text-xs font-medium leading-6 text-gray-900 text-white"
                    >
                      University :
                    </label>
                  </div>
                  <div className="my-2 ">
                    <input
                      id="MSUni"
                      {...register("MSUni", {})}
                      type="MSUni"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetMSUni(e.target.value)}
                    />
                    {errors.MSUni && (
                      <p className="text-red-500">{errors.MSUni.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <p className="pb-3">
                    {" "}
                    Interests <span className="text-xs">(Max 5)</span>:
                  </p>
                  <div className="w-full h-2/4 flex flex-wrap bg-white p-3 rounded-lg ring ring-AuthBtn-0 ring-offset-1">
                    {providedInterests.map((interest) => (
                      <div
                        key={interest}
                        className={
                          userinterests.includes(interest)
                            ? "bg-AuthBtn-0 p-2 m-1 text-white border border-black rounded-lg text-[0.44rem] hover:cursor-pointer hover:opacity-70 inline bg-black"
                            : "bg-AuthBtn-0 p-2 m-1 text-white border border-black rounded-lg text-[0.44rem] hover:cursor-pointer hover:opacity-70 inline"
                        }
                        onClick={() => pushInterest(interest)}
                      >
                        {interest}
                        {!userinterests.includes(interest) ? (
                          <svg
                            className="w-3 h-3 inline ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        ) : null}
                      </div>
                    ))}
                    <div className="flex flex-row items-center w-full h-10 m-2 mt-4">
                    <input
                      value={newInterest}
                      placeholder="Add new interest"
                      className=" pl-2 block w-full rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => SetNewInterest(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button type="button"  className="h-5/6 border-4 border-AuthBtn-0 bg-AuthBtn-0 rounded-r-md w-1/12 hover:opacity-70" onClick={()=>handleAddNewInterest()}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white">
                         <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
                      </svg>
                    </button>
                     
                    </div>
                    
                    
                  </div>
                  
                </div>
                {interestError && (
                  <h4 className="text-red-500">{interestError}</h4>
                )}
                <div className="w-full flex flex-row">
                  <button
                    type="button"
                    className="flex m-2 w-1/2 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handlePrevious(2)}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="flex m-2 w-1/2 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handleNext(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {page === 3 && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email Required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Email Not Valid",
                        },
                      })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="Username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="Username"
                      {...register("Username", {
                        required: "Username Required",
                      })}
                      type="Username"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.Username && (
                      <p className="text-red-500">{errors.Username.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "Password is Required",
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                          message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Confirm Password Required",
                        validate: (value, formValues) =>
                          value === formValues.password ||
                          "Password Not Matching",
                      })}
                      type="password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
             
                  
               </div>
                <div className="w-full flex flex-row">
                  <button
                    className="flex m-2 w-1/2 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => handlePrevious(3)}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex m-2 w-1/2 justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-AuthBtn-0 hover:bg-AuthBtnHover-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {status === "loading" ? (
                      <MoonLoader color="white" size={20} />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-AuthBtn-0 hover:text-AuthBtnHover-0"
            >
              Sign In 😊
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp;
