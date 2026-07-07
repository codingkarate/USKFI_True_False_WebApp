import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

const Result = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const result = state?.result;
    console.log(result);
    console.log("Attempt ID:", result?.attemptId);

    if (!result) {

        

        return (

            <div className="p-10">

                <h1 className="text-3xl font-bold">
                    Result not found
                </h1>

            </div>

        );

    }

    return (

        <DashboardLayout>

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl w-125 p-8">

                <h1 className="text-4xl font-bold text-center mb-8">
                    Exam Result
                </h1>

                <div className="space-y-4 text-lg">

                    <p>
                        <strong>Total Marks:</strong> {result.totalMarks}
                    </p>

                    <p>
                        <strong>Obtained Marks:</strong> {result.obtainedMarks}
                    </p>

                    <p>
                        <strong>Percentage:</strong> {result.percentage}%
                    </p>

                </div>

                <div className="mt-10 text-center">

                    <button
                    onClick={() =>
                        navigate(
                            `/candidate/review/${result.attemptId}`
                        )
                    }
                    className="bg-green-600 text-white px-6 py-3 rounded-lg mt-4"
                    >
                        Review Solutions
                    </button>

                </div>

            </div>

        </div>

        </DashboardLayout>

    );

    

};

export default Result;