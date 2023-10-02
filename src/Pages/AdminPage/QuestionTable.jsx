import React, { useEffect, useState } from 'react'
import { getQuestionTableData } from '../../services/Admin APIs/admintestAPI'
import toast, { Toaster } from 'react-hot-toast';


export const QuestionTable = () => {

    const [QuestionsData, setQuestionsData] = useState(null)

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
                            QuestionsData?.map((que,index) => {
                                return (
                                    <tr key={que.questionID}>
                                        <th scope="row">{index+1}</th>
                                        <td>{que.question}</td>
                                        <td>{que.answer}</td>
                                        <td>{que.option_1}</td>
                                        <td>{que.option_2}</td>
                                        <td>{que.option_3}</td>
                                        <td>{que.option_4}</td>
                                        <td>{que.testID}</td>
                                        <td className='d-flex justify-content-center'>
                                            <button className='btn btn-warning me-2'>Edit</button>
                                            <button className='btn btn-danger'>Del</button>
                                        </td>
                                    </tr>
                                   
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
