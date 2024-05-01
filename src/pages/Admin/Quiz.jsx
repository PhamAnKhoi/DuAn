// import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HeaderAdmin from "./HeaderAdmin";
import SidebarAdmin from "./SidebarAdmin";
import { useParams } from "react-router-dom";
import ToastMessage from "../../components/notifice";
import axios from "axios";

const QuizForm = () => {
    let param = useParams();
    let lesson_id = param.lesson;
    // if (user !== undefined) {
    //     user = JSON.parse(user);
    //     var auth = user.permission;
    //     // console.log(user.access_token);
    // }
    // if (auth !== "ADMIN" && auth !== "TEACHER") {
    //     window.location.href = "/login";
    // }
    // // console.log(lessonId);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("");

    const [user, setUser] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

    useEffect(() => {
        getUser()



        // var user = Cookies.get("user");
        // var auth = 'GUEST';

        // if (user !== undefined) {
        //     user = JSON.parse(user);
        //     // console.log(user);
        //     auth = user.permission;
        //     setUser(user)
        //     if (auth !== "ADMIN" && auth !== "TEACHER") {
        //         console.log(auth);
        //         // window.location.href = "/login";
        //         setShowToast(true);
        //         setToastMessage("Tài khoản của bạn không có quyền thực hiện thao tác này!");
        //         setToastVariant("danger");
        //         setTimeout(() => {
        //             window.location.href = "/login";
        //         }, 1500);
        //     }
        // } else {
        //     setShowToast(true);
        //     setToastMessage("Hãy đăng nhập để thực hiện thao tác này!");
        //     setToastVariant("danger");
        //     // window.location.href = "/admin/create-post";
        //     setTimeout(() => {
        //         window.location.href = "/login";
        //     }, 1500);
        // }

    }, [])
    function getUser() {
        var user = Cookies.get("user");
        var auth = 'GUEST';
        console.log('getUser');
        if (user !== undefined) {
            user = JSON.parse(user);
            console.log(user);
            auth = user.permission;
            setUser(user)
            if (auth !== "ADMIN" && auth !== "TEACHER") {
                // window.location.href = "/login";
                setShowToast(true);
                setToastMessage("Tài khoản của bạn không có quyền thực hiện thao tác này!");
                setToastVariant("danger");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            }
        } else {
            setShowToast(true);
            setToastMessage("Hãy đăng nhập để thực hiện thao tác này!");
            setToastVariant("danger");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1500);
        }
    }
    // 
    const handleSubmit = async (e) => {

        e.preventDefault();

        let haveAnswer = 0;
        // let haveCorrectAnswer = false;
        for (let index = 0; index < answers.length; index++) {
            if (answers[index] !== '') {
                haveAnswer++;
            }
        }
        if (question === '') {
            setShowToast(true);
            setToastMessage('Hãy nhập câu hỏi.');
            setToastVariant("danger");
            return;
        }
        if (haveAnswer < 2) {
            setShowToast(true);
            setToastMessage('Hãy nhập ít nhất 2 đáp án.');
            setToastVariant("danger");
            return;
        }
        if (correctAnswerIndex === null) {
            setShowToast(true);
            setToastMessage('Hãy nhập ít nhất 1 đáp án đúng.');
            setToastVariant("danger");
            return;
        } else {
            if (answers[correctAnswerIndex] === '') {
                setShowToast(true);
                setToastMessage('Đáp án đúng không có nội dung.');
                setToastVariant("danger");
                return;
            }
        }

        // console.log(lesson_id);
        // console.log(question);
        console.log(answers);
        // console.log(correctAnswerIndex);
        try {
            const formData = new FormData();
            formData.append("lesson_id", lesson_id);
            formData.append("question", question);
            formData.append("answers", JSON.stringify(answers));
            formData.append("correctAnswerIndex", correctAnswerIndex);

            await axios.post(
                "http://api.course-selling.id.vn/api/course/create-quiz",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", //upload file
                        Authorization: `Bearer ${user.access_token}`,
                    },
                }
            ).then((response) => {
                // console.log(response.data);
                if (response.data.status) {
                    setShowToast(true);
                    setToastMessage(response.data.message);
                    setToastVariant("success");
                    setTimeout(() => {
                        window.location.href = `/admin/list-course/list-session/list-lessons/quiz-create/` + lesson_id;
                      }, 2000);
                } else {
                    setShowToast(true);
                    setToastMessage(response.data.message);
                    setToastVariant("danger");
                }
            })
        } catch (error) {
            console.error("Fail to create Quiz: ", error);
            setShowToast(true);
            setToastMessage("Có xẩy ra lỗi khi tạo Quiz");
            setToastVariant("danger");
        }

    };

    return (
        <div className="Admin">
            <ToastMessage
                show={showToast}
                setShow={setShowToast}
                message={toastMessage}
                variant={toastVariant}
            />
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
                                        <label className="form-label">Câu hỏi: </label>
                                        <input
                                            className="form-control"
                                            placeholder="Tên câu hỏi"
                                            type="text" value={question} onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                    {answers.map((answer, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label className="form-label">Câu trả lời {index + 1}: </label>
                                                <input
                                                    className="form-control"
                                                    placeholder={`Đáp án ${index + 1}`}
                                                    type="text"
                                                    value={answer}
                                                    onChange={(e) => {
                                                        const newAnswers = [...answers];
                                                        newAnswers[index] = e.target.value;
                                                        setAnswers(newAnswers);
                                                    }}
                                                />
                                            </div>
                                            <label className="form-label mb-3">
                                                <input
                                                    type="radio"
                                                    name="correctAnswer"
                                                    className=" me-2"
                                                    checked={correctAnswerIndex === index}
                                                    onChange={() => setCorrectAnswerIndex(index)}
                                                />

                                                {`Đúng`}
                                            </label>
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