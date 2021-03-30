import { gql } from '@apollo/client';

//Mutation for order
export const SAVE_ORDER = gql`
    mutation save_order($idProfessor: Int!, $idEscola: Int!, $idMotivo: Int!, $idDisciplina: Int!, $hrMatutino: Int, $hrVespertino: Int, 
                        $hrNoturno: Int, $idUsuario: Int!, $observacao: String){
        saveOrder(encaminhamento:{
            colaborador:{
                id: $idProfessor
            },
            escola:{
                id: $idEscola
            },
            motivo:{
                id: $idMotivo
            },
            disciplina:{
                id: $idDisciplina
            },
            hrMatutino:$hrMatutino
            hrVespertino:$hrVespertino
            hrNoturno:$hrNoturno
            usuarioCadastro:{
                id:$idUsuario
            },
            usuarioStatus:{
                id:$idUsuario
            }
            observacao: $observacao
          }){
            id
          }
    }
`