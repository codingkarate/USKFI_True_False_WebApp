import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    const handleLogout = () => {

        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/", { replace: true });
    };

    return (

        <aside className="bg-slate-900 text-white w-64 min-h-screen flex flex-col justify-between">

            <div>

                <h2 className="text-2xl font-bold p-6 border-b">
                    USKFI
                </h2>

                <nav className="flex flex-col">

                    {/* SUPERADMIN */}

                    {role === "superadmin" && (
                        <>

                            <Link
                                to="/superadmin/dashboard"
                                className="p-4 hover:bg-slate-700"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/superadmin/users"
                                className="p-4 hover:bg-slate-700"
                            >
                                Users
                            </Link>

                            <Link
                                to="/superadmin/tests"
                                className="p-4 hover:bg-slate-700"
                            >
                                Tests
                            </Link>

                            <Link
                                to="/superadmin/questions"
                                className="p-4 hover:bg-slate-700"
                            >
                                Questions
                            </Link>

                            <Link
                                to="/superadmin/results"
                                className="p-4 hover:bg-slate-700"
                            >
                                Results
                            </Link>

                        </>
                    )}

                    {/* ADMIN */}

                    {role === "admin" && (
                        <>

                            <Link
                                to="/admin/dashboard"
                                className="p-4 hover:bg-slate-700"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/admin/users"
                                className="p-4 hover:bg-slate-700"
                            >
                                Candidates
                            </Link>

                            <Link
                                to="/admin/tests"
                                className="p-4 hover:bg-slate-700"
                            >
                                Tests
                            </Link>

                            <Link
                                to="/admin/questions"
                                className="p-4 hover:bg-slate-700"
                            >
                                Questions
                            </Link>

                            <Link
                                to="/admin/results"
                                className="p-4 hover:bg-slate-700"
                            >
                                Results
                            </Link>

                        </>
                    )}

                    {/* CANDIDATE */}

                    {role === "candidate" && (
                        <>

                            <Link
                                to="/candidate/dashboard"
                                className="p-4 hover:bg-slate-700"
                            >
                                Dashboard
                            </Link>

                            <Link
                                to="/candidate/tests"
                                className="p-4 hover:bg-slate-700"
                            >
                                Available Tests
                            </Link>

                        </>
                    )}

                </nav>

            </div>

            {/* Logout */}

            <div className="border-t">

                <button
                    onClick={handleLogout}
                    className="w-full text-left p-4 hover:bg-red-700"
                >
                    Logout
                </button>

            </div>

        </aside>

    );

};

export default Sidebar;



















// import { Link } from "react-router-dom";

// const Sidebar = () => {

//     const user = JSON.parse(localStorage.getItem("user"));

//     const role = user?.role;

//     return (

//         <aside className="bg-slate-900 text-white w-64 min-h-screen">

//             <h2 className="text-2xl font-bold p-6 border-b">
//                 USKFI
//             </h2>

//             <nav className="flex flex-col">

//                 {/* SUPERADMIN */}

//                 {role === "superadmin" && (
//                     <>
//                         <Link
//                             to="/superadmin/dashboard"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Dashboard
//                         </Link>

//                         <Link
//                             to="/superadmin/users"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Users
//                         </Link>

//                         <Link
//                             to="/superadmin/tests"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Tests
//                         </Link>

//                         <Link
//                             to="/superadmin/questions"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Questions
//                         </Link>

//                         <Link
//                             to="/superadmin/results"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Results
//                         </Link>
//                     </>
//                 )}

//                 {/* ADMIN */}

//                 {role === "admin" && (
//                     <>
//                         <Link
//                             to="/admin/dashboard"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Dashboard
//                         </Link>

//                         <Link
//                             to="/admin/users"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Candidates
//                         </Link>

//                         <Link
//                             to="/admin/tests"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Tests
//                         </Link>

//                         <Link
//                             to="/admin/questions"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Questions
//                         </Link>

//                         <Link
//                             to="/admin/results"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Results
//                         </Link>
//                     </>
//                 )}

//                 {/* CANDIDATE */}

//                 {role === "candidate" && (
//                     <>
//                         <Link
//                             to="/candidate/dashboard"
//                             className="p-4 hover:bg-slate-700"
//                         >
//                             Dashboard
//                         </Link>
//                     </>
//                 )}

//             </nav>

//         </aside>

//     );

// };

// export default Sidebar;

















































// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="bg-slate-900 text-white w-64 min-h-screen">

//       <h2 className="text-2xl font-bold p-6 border-b">
//         USKFI
//       </h2>

//       <nav className="flex flex-col">

//         <Link
//           to="/superadmin/dashboard"
//           className="p-4 hover:bg-slate-700"
//         >
//           Dashboard
//         </Link>

//         <Link
//           to="/superadmin/users"
//           className="p-4 hover:bg-slate-700"
//         >
//           Users
//         </Link>

//         <Link
//           to="/superadmin/tests"
//           className="p-4 hover:bg-slate-700"
//         >
//           Tests
//         </Link>

//         <Link
//           to="/superadmin/questions"
//           className="p-4 hover:bg-slate-700"
//         >
//           Questions
//         </Link>

//         <Link
//           to="/superadmin/results"
//           className="p-4 hover:bg-slate-700"
//         >
//           Results
//         </Link>

//       </nav>

//     </aside>
//   );
// };

// export default Sidebar;