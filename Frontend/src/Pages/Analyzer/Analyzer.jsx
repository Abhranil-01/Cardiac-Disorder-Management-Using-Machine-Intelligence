import React, { useEffect } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'
import { getToken, removeToken } from '../../Service/LocalStorageService';
import { useDispatch } from 'react-redux';
import { unsetUserInfo } from '../../Features/userSlice';
import { unSetUserToken } from '../../Features/authSlice';

function Analyzer() {
const loginToken=localStorage.getItem("loginToken")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("loginToken")
        navigate('/')
      }
      useEffect(()=>{
        if(!loginToken){
            navigate('/')
        }
      },[loginToken])
    return (
        <>{loginToken ?(<>
          <div className="table-responsive">
                <div className='mt-3'>
                {loginToken ?(<NavLink to='/' className="login-button " onClick={handleLogout}>Logout</NavLink>):(<NavLink to='/login' className="login-button" >Login</NavLink>)}
                </div>
          
                <h1 className="text-center">DATA ANALYSIS</h1>
                <br />
                <div className="text-center">
                    <NavLink to='/Data'>Load Data</NavLink>
                </div>
                <br />
            </div>

            <div className="container mt-5">
                <div className="row featurette d-flex justify-content-center align-items-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">GRAPH OF HEART DISEASE PATIENT <br /> <span
                            className="text-body-secondary">ACCORDING TO AGE DISTRIBUTION </span></h2>
                        <p className="lead">
                            <b>Young Adults (Under 40)</b>
                            While heart disease is less common in younger age groups, it can still occur, particularly among
                            individuals with risk factors such as obesity, high blood pressure, diabetes, smoking, and a family
                            history of heart disease.
                            <b>Middle-aged Adults (40-64)</b>
                            The risk of heart disease increases significantly with age, and middle-aged adults are more likely
                            to develop heart-related conditions.
                            <b>Older Adults (65 and above)</b>
                            Heart disease becomes increasingly common as individuals age, with a significant portion of older
                            adults being affected by various forms of cardiovascular disease.
                        </p>
                    </div>

                    <div className="col-md-5">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="\src\Images\a&g2.png" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette d-flex justify-content-center align-items-center">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">GENDER DIFFERENCE <br /> <span
                            className="text-body-secondary">OF HEART DISEASE PATIENT</span></h2>
                        <p className="lead">While heart disease affects both men and women, there are differences in the age
                            distribution and presentation of heart disease between genders.
                            Men tend to develop heart disease at a younger age compared to women, with higher rates of heart
                            attacks and coronary artery disease in middle-aged and younger adult men.
                            Women may have a lower overall risk of heart disease compared to men before menopause, but their
                            risk increases significantly after menopause, with a shift towards a more similar age distribution
                            to men. </p>
                    </div>

                    <div className="col-md-5 order-md-1">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="\src\Images\a&g3.png" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette d-flex justify-content-center align-items-center">
                    <div className="col-md-7">
                        <h2 className="featurette-heading fw-normal lh-1">GENDER DIFFERENCE <br /> <span
                            className="text-body-secondary">OF HEART DISEASE PATIENT (IN PIE CHART)</span></h2>
                        <p className="lead">
                            While heart disease affects both men and women, there are differences in the age
                            distribution and presentation of heart disease between genders.
                            Men tend to develop heart disease at a younger age compared to women, with higher rates of heart
                            attacks and coronary artery disease in middle-aged and younger adult men.
                            Women may have a lower overall risk of heart disease compared to men before menopause, but their
                            risk increases significantly after menopause, with a shift towards a more similar age distribution
                            to men.
                        </p>
                    </div>

                    <div className="col-md-5">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            src="\src\Images\gender.png" />
                    </div>
                </div>

                <hr className="featurette-divider" />

                <div className="row featurette d-flex justify-content-center align-items-center">
                    <div className="col-md-7 order-md-2">
                        <h2 className="featurette-heading fw-normal lh-1">CHEST PAIN <br/> <span className="text-body-secondary">OF
                            NORMAL PATIENTS</span></h2>
                        <p className="lead">
                            Chest pain in a normal, healthy individual can be caused by various factors unrelated to heart
                            disease. Muscle Strain, overexertion, heavy
                            lifting, or sudden movements can strain the muscles in the chest wall, leading to localized pain.
                            This type of pain is often sharp and may worsen with movement or deep breathing. Pleurisy,
                            inflammation of the pleura, the lining surrounding the lungs, can cause sharp chest pain that
                            worsens with deep breathing or coughing. Pleuritic chest pain is often described as a stabbing
                            sensation.
                        </p>
                    </div>

                    <div className="col-md-5 order-md-1">
                        <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="\src\Images\cp1.png" />
                    </div>
                </div>

                <hr className="featurette-divider"/>

                    <div className="row featurette d-flex justify-content-center align-items-center">
                        <div className="col-md-7">
                            <h2 className="featurette-heading fw-normal lh-1">CHEST PAIN <br /> <span className="text-body-secondary">OF HEART
                                PATIENTS</span></h2>
                            <p className="lead">Angina, chest pain due to reduced blood flow to the heart muscle (angina) is a hallmark
                                symptom of coronary artery disease. Angina typically presents as pressure, squeezing, or heaviness
                                in the chest, often radiating to the arms, shoulders, neck, or jaw. It may occur with exertion or
                                stress and usually subsides with rest or medication.
                                Heart Attack (Myocardial Infarction),chest pain caused by a heart attack is often more severe and
                                prolonged than angina.
                                Heart attack chest pain is usually not relieved by rest or nitroglycerin and requires immediate
                                medical attention. </p>
                        </div>

                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" src="\src\Images\cp2.png" />
                        </div>
                    </div>



                    <hr className="featurette-divider" />


                    <div className="row featurette d-flex justify-content-center align-items-center">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading fw-normal lh-1">REST ECG<br/> <span className="text-body-secondary">OF
                                NORMAL PATIENTS</span></h2>
                            <p className="lead">
                                A resting electrocardiogram (ECG or EKG) of a normal patient typically shows a specific pattern of
                                electrical activity in the heart that indicates normal cardiac function.
                                Chest pain in a normal, healthy individual can be caused by various factors unrelated to heart
                                disease. Muscle Strain, overexertion, heavy
                                lifting, or sudden movements can strain the muscles in the chest wall, leading to localized pain.
                                Pleurisy,
                                inflammation of the pleura, the lining surrounding the lungs, can cause sharp chest pain that
                                worsens with deep breathing or coughing. Pleuritic chest pain is often described as a stabbing
                                sensation.
                            </p>
                        </div>

                        <div className="col-md-5 order-md-1">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                src="\src\Images\restecg1.png" />
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette d-flex justify-content-center align-items-center">
                        <div className="col-md-7">
                            <h2 className="featurette-heading fw-normal lh-1">REST ECG <br /> <span className="text-body-secondary">OF HEART
                                PATIENTS</span></h2>
                            <p className="lead">A resting electrocardiogram (ECG or EKG) of a normal patient typically shows a specific
                                pattern of electrical activity in the heart that indicates normal cardiac function.Angina, chest
                                pain due to reduced blood flow to the heart muscle (angina) is a hallmark
                                symptom of coronary artery disease.
                                Myocardial Infarction,chest pain caused by a heart attack is often more severe and
                                prolonged than angina.
                                Heart attack chest pain is usually not relieved by rest or nitroglycerin and requires immediate
                                medical attention. </p>
                        </div>

                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                src="\src\Images\restecg2.png" />
                        </div>
                    </div>


                    <hr className="featurette-divider" />


                    <div className="row featurette d-flex justify-content-center align-items-center">
                        <div className="col-md-7 order-md-2">
                            <h2 className="featurette-heading fw-normal lh-1">ST SLOPE <br/> <span className="text-body-secondary">OF
                                NORMAL PATIENTS</span></h2>
                            <p className="lead">
                                The ST segment is typically flat and lies on the baseline (also known as the isoelectric line). The
                                ST segment represents the period between ventricular depolarization (QRS complex) and ventricular
                                repolarization (T wave). In a normal heart patient, the ST segment should be
                                isoelectric, the ST segment should be relatively flat and exhibit no significant deviation from the
                                baseline. It should maintain a consistent level with the baseline, indicating normal ventricular
                                repolarization.
                            </p>
                        </div>

                        <div className="col-md-5 order-md-1">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                src="\src\Images\st_slope1.png" />
                        </div>
                    </div>

                    <hr className="featurette-divider" />

                    <div className="row featurette d-flex justify-content-center align-items-center">
                        <div className="col-md-7">
                            <h2 className="featurette-heading fw-normal lh-1">ST SLOPE <br /> <span className="text-body-secondary">OF HEART
                                PATIENTS</span></h2>
                            <p className="lead">In individuals with heart disease or cardiac abnormalities, the ST segment on an
                                electrocardiogram (ECG or EKG) may exhibit deviations from the baseline, indicating potential
                                ischemia, injury, or other cardiac pathology.ST-Segment Elevation,
                                ST-segment elevation is a key indicator of myocardial infarction (heart attack) or acute coronary
                                syndrome. It appears as an elevation of the ST segment above the baseline and is typically greater
                                than 1 mm (0.1 mV) in leads facing the area of myocardial injury.
                            </p>
                        </div>

                        <div className="col-md-5">
                            <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                src="\src\Images\st_slope2.png" />
                        </div>
                    </div>


                    <hr className="featurette-divider"/>


                        <div className="row featurette d-flex justify-content-center align-items-center">
                            <div className="col-md-7 order-md-2">
                                <h2 className="featurette-heading fw-normal lh-1">PERCENTAGE OF NORMAL & HEART DISEASE <br/> <span
                                    className="text-body-secondary">PATIENTS
                                    IN DATASET</span></h2>
                                <p className="lead text-justify">
                                    Chest pain in a normal, healthy individual can be caused by various factors unrelated to heart
                                    disease. While chest pain is often associated with heart problems, it's essential to recognize that
                                    many non-cardiac issues can also lead to chest discomfort. Angina, chest pain due to reduced blood
                                    flow to the heart muscle (angina) is a hallmark
                                    symptom of coronary artery disease. Angina typically presents as pressure, squeezing, or heaviness
                                    in the chest, often radiating to the arms, shoulders, neck, or jaw. It may occur with exertion or
                                    stress and usually subsides with rest or medication.
                                </p>
                            </div>

                            <div className="col-md-5 order-md-1">
                                <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                    src="\src\Images\dataset1.png" />
                            </div>
                        </div>

                        <hr className="featurette-divider"/>

                            <div className="row featurette d-flex justify-content-center align-items-center">
                                <div className="col-md-7">
                                    <h2 className="featurette-heading fw-normal lh-1">NUMBER OF NORMAL & HEART DISEASE <br/> <span
                                        className="text-body-secondary">
                                        PATIENTS IN DATASET</span></h2>
                                    <p className="lead">Chest pain in a normal, healthy individual can be caused by various factors unrelated to
                                        heart
                                        disease. While chest pain is often associated with heart problems, it's essential to recognize that
                                        many non-cardiac issues can also lead to chest discomfort. Angina, chest pain due to reduced blood
                                        flow to the heart muscle (angina) is a hallmark
                                        symptom of coronary artery disease. Angina typically presents as pressure, squeezing, or heaviness
                                        in the chest, often radiating to the arms, shoulders, neck, or jaw. It may occur with exertion or
                                        stress and usually subsides with rest or medication. </p>
                                </div>

                                <div className="col-md-5">
                                    <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                                        src="\src\Images\dataset2.png" />
                                </div>
                            </div>


                            <hr className="featurette-divider"/>

                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="featurette-heading fw-normal lh-1 text-center">ACCURACY COMPARISION <span
                                            className="text-body-secondary">| OF DIFFERENT CLASSIFIERS</span></h2> <br/>
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <img className="bd-placeholder-img bd-placeholder-img-lg 
                    featurette-image mx-auto img-fluid img-dec" src="\src\Images\model.png" />
                                            </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <p className="lead">Comparing the accuracy of different classifiers is a common practice in machine learning
                                            to determine which algorithm performs best for a given dataset and task.
                                            Accuracy is just one evaluation metric, and depending on your dataset and problem, other metrics
                                            such as precision, recall, F1-score, or area under the ROC curve (AUC-ROC) may provide additional
                                            insights. Consider which metrics are most relevant to your specific problem and dataset.Choose a set
                                            of classifiers to compare. Common classifiers include logistic regression, decision trees, random
                                            forests, support vector machines (SVM), k-nearest neighbors (KNN), naive Bayes, and neural networks.
                                            Each classifier has its own strengths, weaknesses, and assumptions about the data. </p>
                                    </div>
                                </div>
                            </div></>):(<p>Not Login</p>)}
          
                            </>
                            );
}

                            export default Analyzer;
