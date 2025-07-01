import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import ExamSection from "./ExamSection.jsx";
import Features from "./Features.jsx";
import Sidebar from "./Sidebar.jsx";
import StartLearning from "./StartLearning.jsx";
const Fullpage = ({elements,func,funcs}) => {
    const {Show, setShow}=func;
    return (
        <div>
            {Show && <Sidebar func={func} elements={elements} />}
            <Navbar func={func} funcs={funcs} />
            <Hero elements={elements} funcs={funcs} />
            <ExamSection func={func} elements={elements} funcs={funcs} />
            <Features />
            <StartLearning func={func} funcs={funcs} />
            <Footer />
        </div>
    )
}
export default Fullpage;