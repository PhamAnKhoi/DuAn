// import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
// import ToastMessage from "../../components/notifice";

const QuizForm = () => {
    let param = useParams();
    let lesson_id = param.lesson;
    var user = Cookies.get("user");
    if (user !== undefined) {
        user = JSON.parse(user);
        var auth = user.permission;
        // console.log(user.access_token);
    }
    if (auth !== "ADMIN" && auth !== "TEACHER") {
        window.location.href = "/login";
    }
    // console.log(lessonId);
    // const sessionId = param.sessionId;
    //   const [showToast, setShowToast] = useState(false);
    //   const [toastMessage, setToastMessage] = useState("");
    //   const [toastVariant, setToastVariant] = useState("");

    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    const handleSubmit = async (e) => {

        console.log(lesson_id);
        console.log(question);
        console.log(answers);
        console.log(correctAnswerIndex);
        e.preventDefault();

    };
    
    return (
        <div className="Admin">
            {/* <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            /> */}
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light">
                        <SidebarAdmin page="createCourse" />
                    </div>
                    <div className="col py-1">
                        <HeaderAdmin />
                        <div className="w-100 quiz">
                            <form onSubmit={handleSubmit} className="custom-form w-100 m-0 mt-3 w-100 py-3 px-4">
                                <div className="row">
                                    <div className="custom-div-1 fs-4">Tạo câu hỏi Quiz</div>
                                    <div className="mb-3">
                                        <label className="form-label">Question: </label>
                                        <input
                                            className="form-control"
                                            placeholder="Tên bài viết"
                                            type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                    {answers.map((answer, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label className="form-label">Answer {index + 1}: </label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Tên bài viết"
                                                    type="text"
                                                    value={answer}
                                                    onChange={(e) => {
                                                        const newAnswers = [...answers];
                                                        newAnswers[index] = e.target.value;
                                                        setAnswers(newAnswers);
                                                    }}
                                                />
                                            </div>
                                            <input
                                                type="radio"
                                                name="correctAnswer"
                                                className=" me-2"
                                                checked={correctAnswerIndex === index}
                                                onChange={() => setCorrectAnswerIndex(index)}
                                            />
                                            <label className="form-label mb-3">Correct Answer {index + 1}: </label>
                                        </div>
                                    ))}
                                    <button className="btn bg-btn col-lg-2 " type="submit">
                                        Lưu câu hỏi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizForm;