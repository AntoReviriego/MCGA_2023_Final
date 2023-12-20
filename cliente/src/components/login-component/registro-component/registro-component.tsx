import { useState } from "react";
import { TypeLogin } from "../types";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../provider/user.context.provider";
import { UserContextType } from "../../../provider/type";
import { EmailValidacion, PasswordValidacion } from "../../../utility/validaciones";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Spinner from "../../shared/spinner-component/spinner-component";
import _Toast from "../../shared/toast-component/toast-component";
const Registro = () => {
    const [validated, setValidated] = useState(false);
    const [guardadoExitoso, setGuardadoExitoso] = useState(false); // toast
    const [loading, setLoading] = useState(false); // spinner
    const {
        register,
        handleSubmit: validateForm,
        formState: { errors },
        reset
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
        setLoading(true);
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user; 
            localStorage.setItem('token', await user.getIdToken());
            localStorage.setItem('user', JSON.stringify(user));
            setLoggedInUser(user.email);
            navigate("/");
            window.location.reload();
        }
        catch(error){
            setLoading(false);
            setGuardadoExitoso(true);
            reset(); // Restablece los valores del formulario en caso de error
            console.error("Error al registrarse y loguearse: " + error);
        }
    }

    return (
        <>
            <Spinner showSpinner={loading} />
            {guardadoExitoso && (
                <_Toast 
                    title="Error"
                    type="err"
                    message={`¡No se cumplieron los requisistos!`}
                    url = "/login"
                />
            )}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-8 col-lg-6">
                        <Card>
                            <Card.Header> Registrarse </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md="12" controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                required
                                                pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
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
                                                minLength={8}
                                                type="password" 
                                                placeholder="*************" 
                                                {...register("password", PasswordValidacion)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password && errors.password.message}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Row>
                                    <Button type="submit">Registarse</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Registro;