import React from 'react';
import { images } from '../../utilities/imageimports';

export const TestPage2 = () => {
    return (
        <>
            <div className='container p-0' id='test'>
                <div className='d-flex flex-column flex-md-row' style={{ height: '100vh' }}>
                    <div className='w-100 iframe flex-fill' style={{ overflowX: 'hidden' }}>
                        <iframe className='w-100 h-100' src={images.QuestionPaper} />
                    </div>
                    <form className='p-3'>
                        <p className='text-secondary'>Select the Options Based on question numbers</p>
                        <div className='input-group mb-3'>
                            <span className='input-group-text' >
                                Question Number
                            </span>
                            <input type='text' className='form-control' value={10} />
                            <button className='btn btn-dark' type='submit'>
                                Go
                            </button>
                        </div>
                        <div className='form-check d-flex flex-row justify-content-center gap-5'>
                            <div>
                                <div className='mb-2'>
                                    <input className='form-check-input' type='radio' name='options' id='option1' />
                                    <label className='form-check-label' htmlFor='option1'>
                                        Option A
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <input className='form-check-input' type='radio' name='options' id='option2' />
                                    <label className='form-check-label' htmlFor='option2'>
                                        Option B
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className='mb-2'>
                                    <input className='form-check-input' type='radio' name='options' id='option3' />
                                    <label className='form-check-label' htmlFor='option3'>
                                        Option C
                                    </label>
                                </div>
                                <div className='mb-2'>
                                    <input className='form-check-input' type='radio' name='options' id='option4' />
                                    <label className='form-check-label' htmlFor='option4'>
                                        Option D
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='py-2 d-flex justify-content-center gap-3 flex-row'>
                            <button className='btn btn-primary'>Prev</button>
                            <button className='btn btn-primary'>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
