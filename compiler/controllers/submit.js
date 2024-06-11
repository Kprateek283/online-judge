import problem from "../models/problem.js";
import axios from "axios";
import compareOutput from "./compare.js";

const judge = async (req, res) => {
    const { language = "cpp", code } = req.body;
    const id  = req.params.id;
    const Problem = await problem.findById(id);
    console.log(Problem);
    const testcase = Problem.testCases;
    console.log(process.env.COMPILER_URL);
    try {
      let test = [];
      for (var i = 0; i < testcase.length; i++) {
        const input = testcase[i].input;
        const result = await axios.post(`${process.env.COMPILER_URL}/run`, {
          code,
          language,
          input,
        });
        // console.log(result.data);
        // console.log(result.data);
        console.log(testcase[i].expectedOutput);
        const isCorrect = compareOutput(
          result.data.output,
          testcase[i].expectedOutput
        );
        if (!isCorrect) {
          test.push({ testcase: i + 1, success: false });
          console.log("testcase failed");
          return res.send({
            success: false,
            message: `Testcase ${i + 1} failed`,
            test: test,
          });
        } else {
          test.push({ testcase: i + 1, success: true });
        }
      }
      console.log("passed");
      updateScore(userid);
      return res.json({
        success: true,
        message: "testcases passed",
        test: test,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({ success: false, message: error.message });
    }
  };

  export default judge;