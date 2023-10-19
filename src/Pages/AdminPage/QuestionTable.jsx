import React, { useEffect, useState } from 'react'
import { getQuestionTableData } from '../../services/Admin APIs/admintestAPI'
import toast, { Toaster } from 'react-hot-toast';
import { QuestionEditModal } from './QuestionEditModal';
import Button from 'react-bootstrap/Button';


export const QuestionTable = () => {

    const [QuestionsData, setQuestionsData] = useState(null)
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [show, setShow] = useState(false);

    const getdata = async () => {
        const { data, status } = await getQuestionTableData()
        if (status === 200) {
            setQuestionsData(data)
        } else {
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getdata()
    }, [])

    const handleShow =(que)=>{
        setShow(true)
        setSelectedQuestion(que)
    }
    const handleClose = () => setShow(false);

    return (
        <>
            <Toaster />
            <div className='p-4'>
                <h4 className='text-center p-2'>Question And Answers</h4>
                <table className="table table-striped-columns table-bordered">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Question</th>
                            <th scope="col">Ans</th>
                            <th scope="col">Option1</th>
                            <th scope="col">Option2</th>
                            <th scope="col">Option3</th>
                            <th scope="col">Option4</th>
                            <th scope="col">TestID</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            QuestionsData?.map((que, index) => {
                                return (
                                    <tr key={que.questionID}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{que.question}</td>
                                        <td>{que.answer}</td>
                                        <td>{que.option_1}</td>
                                        <td>{que.option_2}</td>
                                        <td>{que.option_3}</td>
                                        <td>{que.option_4}</td>
                                        <td>{que.testID}</td>
                                        <td className='d-flex justify-content-center'>

                                            <Button variant="primary" onClick={()=>handleShow(que)}>
                                                Edit
                                            </Button>

                                            <button className='btn btn-danger ms-3'>Del</button>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div >
            <QuestionEditModal show={show} que={selectedQuestion} handleClose={handleClose} />
        </>
    )
}
