import { Container } from "react-bootstrap";
import NavBarButtons from "../components/NavBarButtons";

type PageLayoutProps = {
    children?: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <Container>
            <h1>My App</h1>
            {children}
            <footer>
                <NavBarButtons />
            </footer>
        </Container>
    );
};

export default PageLayout;