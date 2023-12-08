import { useState } from "react"
import { TypeLogin } from "./types";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../provider/user.context.provider";
import { UserContextType } from "../../provider/type";
import { EmailValidacion, PasswordValidacion } from "../../utility/validaciones";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const Login = () => {
    const [validated, setValidated] = useState(false);
    const {
        register,
        handleSubmit: validateForm,
        formState: { errors },
    } = useForm<TypeLogin>();
    const navigate = useNavigate();
    const { setLoggedInUser } = useUser() as UserContextType;

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        setValidated(true);
        validateForm(onSubmit)(e); // Ejecuta la lógica de handleSubmit de react-hook-form
    };

    const onSubmit = async (data:TypeLogin) =>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user; 
            localStorage.setItem("token", await user.getIdToken())
            localStorage.setItem("user", JSON.stringify(user))
            setLoggedInUser(user.email)
            navigate("/")
        }
        catch(error){
            console.error("Error al loguearse: " + error)
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-8 col-lg-6">
                        <Card>
                            <Card.Header> Iniciar sesión</Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="correo@correo.com"
                                                {...register("email", EmailValidacion)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email && errors.email.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="password">
                                            <Form.Label>Contraseña</Form.Label>
                                            <Form.Control 
                                                required
                                                type="password" 
                                                placeholder="*************" 
                                                {...register("password", PasswordValidacion)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password && errors.password.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Iniciar sesión</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login