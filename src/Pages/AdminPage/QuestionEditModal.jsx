import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik, useFormikContext } from 'formik';
import * as Yup from 'yup';

export const QuestionEditModal = ({ show, handleClose, que }) => {

    const formikRef = React.useRef();

    const {
        answer = '',
        option_1 = '',
        option_2 = '',
        option_3 = '',
        option_4 = '',
        question = '',
        questionID = '',
        testID = '',
    } = que || {};
    console.log(question, testID, questionID);

    const formik = useFormik({
        initialValues: {
            answer
            , option_1, option_2, option_3, option_4, question, questionID, testID
        },
        validationSchema: Yup.object({
            answer: Yup.number().required('Required'),
            option_1: Yup.string().required("required"),
            option_2: Yup.string().required("required"),
            option_3: Yup.string().required("required"),
            option_4: Yup.string().required("required"),
            question: Yup.string().required("required"),
            testID: Yup.string().required("required"),
        }),
        onSubmit: values => {
            console.log("Submit cliecked");
            alert(JSON.stringify(values, null, 2));
        },
    });

    useEffect(() => {
        // Update form values when que changes
        formik.setValues({
            answer,
            option_1,
            option_2,
            option_3,
            option_4,
            question,
            questionID,
            testID,
        });
    }, [que]);


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit the Question</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Form ref={formikRef} onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="modalQuestion">
                            <Form.Label>Question</Form.Label>
                            <Form.Control as="textarea" rows={1} {...formik.getFieldProps('question')} />
                            {formik.touched.question && formik.errors.question ? (
                                <div>{formik.errors.question}</div>
                            ) : null}
                        </Form.Group>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modalAnswer">
                                        <Form.Label>Question</Form.Label>

                                        <Form.Select aria-label="Default select example " {...formik.getFieldProps('answer')}>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                            <option value="4">Four</option>
                                        </Form.Select>
                                        {formik.touched.answer && formik.errors.answer ? (
                                            <div>{formik.errors.answer}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modalTestID">
                                        <Form.Label>TestID</Form.Label>
                                        <Form.Control type="text" {...formik.getFieldProps('testID')} />
                                        {formik.touched.testID && formik.errors.testID ? (
                                            <div>{formik.errors.testID}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        {/*  */}
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modaloption1">
                                        <Form.Label>Option 1</Form.Label>
                                        <Form.Control type="text" placeholder="" {...formik.getFieldProps('option_1')} />
                                        {formik.touched.option_1 && formik.errors.option_1 ? (
                                            <div>{formik.errors.option_1}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modaloption2">
                                        <Form.Label>Option 2</Form.Label>
                                        <Form.Control type="text" placeholder=""  {...formik.getFieldProps('option_2')} />
                                        {formik.touched.option_2 && formik.errors.option_2 ? (
                                            <div>{formik.errors.option_2}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modaloption3">
                                        <Form.Label>Option 3</Form.Label>
                                        <Form.Control type="text" placeholder=""  {...formik.getFieldProps('option_3')} />
                                        {formik.touched.option_3 && formik.errors.option_3 ? (
                                            <div>{formik.errors.option_3}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="modaloption4">
                                        <Form.Label>Option 4</Form.Label>
                                        <Form.Control type="text" placeholder="" {...formik.getFieldProps('option_4')} />
                                        {formik.touched.option_4 && formik.errors.option_4 ? (
                                            <div>{formik.errors.option_4}</div>
                                        ) : null}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="file" accept='.jpg,.jpeg,.png' />
                            </Form.Group>
                        </Container>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Form>
                </div>
            </Modal.Body>
        </Modal>
    );
}







