// import react
import React, { useEffect, useState } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [race, setRace] = useState(-1);
  const [read_ss, setRead_ss] = useState("");
  const [everAlternative, setEverAlternative] = useState(-1);
  const [gpa, setGPA] = useState("");
  const [result, setResult] = useState("Please fill out the form");
  const [gender, setGender] = useState(-1);
  const [enrolledInLunchProgram, setEnrolledInLunchProgram] = useState(-1);
  const [enrolledInSpecialEd, setEnrolledInSpecialEd] = useState(-1);
  const [enrolledInEnglishLearnerProgram, setEnrolledInEnglishLearnerProgram] = useState(-1);
  const [enrolledInGiftedProgram, setEnrolledInGiftedProgram] = useState(-1);
  const [mathGrade, setMathGrade] = useState("");
  const [absentPercent, setAbsentPercent] = useState("");
  const [elementsCounter, setElementsCounter] = useState(0);
  
  useEffect(() => {
    if (elementsCounter < 10) {
      setResult("Please fill out the form");
      return;
    } else {
      axios.post('https://fatima-flask.herokuapp.com/', {
        read_ss: read_ss,
        ever_alternative: everAlternative,
        gpa: gpa,
        african_american: race
      })
        .then(function (response) {
          console.log(response);
          const answer = response['data']['answer'];
          if (answer === '1') {
            setResult("The student is most likely to drop out");
          } else {
            setResult("The student is most likely to stay");
          }
          return response;
        })
        .catch(function (error) {
          console.log(error);
          return error;
        })
    }
  }, [read_ss, everAlternative, gpa, race, elementsCounter]
  );
  const handleRaceChange = async e => {
    const value = parseInt(e.target.value);
    await setRace(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  };

  const handleExtraClasses = async e => {
    const value = parseInt(e.target.value);
    await setEverAlternative(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }
  const handleReadingGrade = async e => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      await setRead_ss(value);
      console.log(e.target.value);
      setElementsCounter(elementsCounter + 1);
      // await makeRequest();
      return;
    } else {
      await setElementsCounter(elementsCounter - 1);
      setResult("Please enter a valid number");
      await setRead_ss("");
    }
  }
  const handleGenderChange = async e => {
    const value = parseInt(e.target.value);
    await setGender(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }

  const handleReducedLunch = async e => {
    const value = parseInt(e.target.value);
    await setEnrolledInLunchProgram(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }

  const handleSpecialEducation = async e => {
    const value = parseInt(e.target.value);
    await setEnrolledInSpecialEd(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }

  const handleEnglishLearner = async e => {
    const value = parseInt(e.target.value);
    await setEnrolledInEnglishLearnerProgram(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }

  const handleGifted = async e => {
    const value = parseInt(e.target.value);
    await setEnrolledInGiftedProgram(value);
    await setElementsCounter(elementsCounter + 1);
    return;
  }

  const handleMathGrade = async e => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      await setMathGrade(value);
      console.log(e.target.value);
      setElementsCounter(elementsCounter + 1);
      // await makeRequest();
      return;
    } else {
      await setElementsCounter(elementsCounter - 1);
      setResult("Please enter a valid number");
      await setMathGrade("");
    }
  }

  const handleAbsentPercent = async e => {
    const value = parseInt(e.target.value);
    if (value >= 0 && value <= 100) {
      await setAbsentPercent(value);
      console.log(e.target.value);
      setElementsCounter(elementsCounter + 1);
      // await makeRequest();
      return;
    } else {
      await setElementsCounter(elementsCounter - 1);
      setResult("Please enter a valid number");
      await setAbsentPercent("");
    }
  }

  const handleGPA = async e => {
    // check if it's only numbers
    const value = parseFloat(e.target.value);
    if (value >= 0 && value <= 4) {
      await setGPA(value);
      await setElementsCounter(elementsCounter + 1);
    } else {
      setElementsCounter(elementsCounter - 1);
      setResult("Please fill out the form");
      setGPA("");
    }
  }

  return (
    <>
      <div className="App">
        <h1>Enter data to predict whether the student will drop out</h1>

      </div>
      <div className='Body'>
        <Container>
          <Row className="rowElem">
            <Col className="colElem">
              <p>Select the ethnicity of the student</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="African American"
                  value={0}
                  onChange={handleRaceChange}
                  checked={race === 0}
                />
                <Form.Check
                  type="radio"
                  label="White"
                  value={1}
                  onChange={handleRaceChange}
                  checked={race === 1}
                />
                <Form.Check
                  type="radio"
                  label="Hispanic"
                  value={2}
                  onChange={handleRaceChange}
                  checked={race === 2}
                />
                <Form.Check
                  type="radio"
                  label="Middle Eastern"
                  value={3}
                  onChange={handleRaceChange}
                  checked={race === 3}
                />
              </Form.Group>
            </Col>
            <Col>
              <p>Gender</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="genderMale"
                  label="Male"
                  value={0}
                  onChange={handleGenderChange}
                  checked={gender === 0}
                />
                <Form.Check
                  type="radio"
                  id="genderFemale"
                  label="Female"
                  value={1}
                  onChange={handleGenderChange}
                  checked={gender === 1}
                />
              </Form.Group>
            </Col>
            <Col className="colElem">
              <p>Enter Reading Grade from 0 to 100</p>
              <Form.Control
                type="number"
                placeholder="0 to 100"
                onChange={handleReadingGrade}
                value={read_ss} />
            </Col>
          </Row>
          <Row className="rowElem">
            <Col className="colElem">
              <p>Enrolled in an alternative school?</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="extraClassesYes"
                  label="Yes"
                  value={1}
                  onChange={handleExtraClasses}
                  checked={everAlternative === 1}
                />
                <Form.Check
                  type="radio"
                  id="extraClassesYes"
                  label="No"
                  value={0}
                  onChange={handleExtraClasses}
                  checked={everAlternative === 0}
                />
              </Form.Group>

            </Col>
            <Col>
              <p>Enrolled in free or reduced price lunch program?</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="yesLunch"
                  label="Yes"
                  value={1}
                  onChange={handleReducedLunch}
                  checked={enrolledInLunchProgram === 1}
                />
                <Form.Check
                  type="radio"
                  id="NoLunch"
                  label="No"
                  value={0}
                  onChange={handleReducedLunch}
                  checked={enrolledInLunchProgram === 0}
                />
              </Form.Group>
            </Col>
            <Col className="colElem">
              <p>Enter GPA from 0 to 4.0?</p>
              <Form.Control
                min={0}
                max={4}
                type="number"
                placeholder="0 - 4.0"
                value={gpa}
                onChange={handleGPA} />
            </Col>
          </Row>
          <Row className="rowElem">
            <Col >
              <p>Enrolled in special education program?</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="yesLunch"
                  label="Yes"
                  value={1}
                  onChange={handleSpecialEducation}
                  checked={enrolledInSpecialEd === 1}
                />
                <Form.Check
                  type="radio"
                  id="NoLunch"
                  label="No"
                  value={0}
                  onChange={handleSpecialEducation}
                  checked={enrolledInSpecialEd === 0}
                />
              </Form.Group>
            </Col>
            <Col>
              <p>Enrolled in English language learners program?</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="yesLunch"
                  label="Yes"
                  value={1}
                  onChange={handleEnglishLearner}
                  checked={enrolledInEnglishLearnerProgram === 1}
                />
                <Form.Check
                  type="radio"
                  id="NoLunch"
                  label="No"
                  value={0}
                  onChange={handleEnglishLearner}
                  checked={enrolledInEnglishLearnerProgram === 0}
                />
              </Form.Group>
            </Col>
            <Col>
              <p>Enrolled in Gifted Program?</p>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="yesGifted"
                  label="Yes"
                  value={1}
                  onChange={handleGifted}
                  checked={enrolledInGiftedProgram === 1}
                />
                <Form.Check
                  type="radio"
                  id="noGifted"
                  label="No"
                  value={0}
                  onChange={handleGifted}
                  checked={enrolledInGiftedProgram === 0}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="rowElem">
            <Col>
              <p>Enter Math Grade from 0 to 100</p>
              <Form.Control
                type="number"
                placeholder="0 to 100"
                onChange={handleMathGrade}
                value={mathGrade} />
            </Col>
            <Col>
              <p>Percent of 8th grade school days marked absent</p>
              <Form.Control
                type="number"
                placeholder="0 to 100"
                onChange={handleAbsentPercent}
                value={absentPercent} />
            </Col>
          </Row>
        </Container>
        <div className="result">
          <h3>{
            result
          }</h3>
        </div>
      </div>
    </>
  );
}

export default App;
