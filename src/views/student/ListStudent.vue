<template>
<div>
   <v-card 
       class="mx-auto mt-5" 
       color="transparent" 
       max-width="1200" 
       elevation="0">

    <router-link to="/registro" style="text-decoration: none">
        <v-btn           
          class="mx-10" 
          fab dark color="#E040FB">
              <v-icon dark>mdi-plus</v-icon>            
        </v-btn>
    </router-link>   

    <v-card-title>
      <v-spacer></v-spacer>
        <v-text-field
            v-model="searchQuery"
            append-icon="mdi-magnify"
            label="pesquise aqui pelo nome do aluno..."
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>
    
        <v-simple-table class="mt-5 pa-2" height="400px" >
          <template v-slot:default>
              <thead>
                <tr class="purple darken-3">
                  <th class="white--text">RA</th>
                  <th class="white--text">NOME COMPLETO</th>
                  <th class="white--text">EMAIL</th>
                  <th class="white--text">CPF</th>
                  <th class="white--text text-center">ACOES</th>
                </tr>
              </thead>
              <tbody>
                  <tr  v-for="students in resultQuery " :key="students.id" >
                  <td>{{ students.ra }}</td>
                  <td>{{ students.name }}</td>
                  <td>{{ students.email }}</td>
                  <td>{{ students.cpf }}</td>
                  <td>
                      <v-btn 
                          class="deep-purple" 
                       dark small fab  
                       @click="formEdit(
                                    students.id,
                                    students.name, 
                                    students.email )">
                                  <v-icon>mdi-pencil</v-icon>
                      </v-btn> 
                    
                    <v-btn 
                        class="error" 
                        fab dark small 
                           @click="remove(students.id)">
                               <v-icon>mdi-delete</v-icon>
                      </v-btn>

                    </td>
                    </tr>
                </tbody>                
     </template>                 
 </v-simple-table>
    <div class="card text-center m-3">
        <jw-pagination 
                :pageSize=7 
                :items="students" 
                @changePage="onChangePage" 
                :styles="customStyles"
                :labels="customLabels"
                 ></jw-pagination>
    </div>

 <!-- Component Dialog to Create and Edit --> 
      <v-dialog v-model="dialog" max-width="500">        
        <v-card>
          <v-card-title class="purple darken-4 white--text">EDITAR ALUNO</v-card-title>    
          <v-card-text>            
            <v-form >             
              <v-container>
                <v-row>
                  <input v-model="students.id" hidden />

                  <v-col cols="12" md="4">
                    <v-text-field 
                          v-model="students.name" 
                          label="NAME"                              
                          >
                          {{ students.name }}
                   </v-text-field>                   
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field 
                          v-model="students.email" 
                          label="Email" > 
                          {{ students.email }} 
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>            
          </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click=" dialog = false " color="blue-grey" dark>Cancelar</v-btn>
            <v-btn @click="saveStudent()" type="submit" color="purple accent-3" dark >Salvar</v-btn>
          </v-card-actions>
       
        </v-card>
      </v-dialog>
        </v-card>          
         
        </div>
</template>

<script>
    const customStyles = {
        a: {
            color: 'white',
            backgroundColor: '#6a1b9a',
            borderRadius:'15px 0 15px 0',
            marginRight:'5px',
            fontSize:'0.9rem',
            fontWeight:'bold'
            
        },
         
    };
    const customLabels = {
            first: '<<',
            last: '>>',
            previous: '<',
            next: '>'
        };


    import axios from "axios";
    import Swal from 'sweetalert2';
    import { Api } from '../../config/api';
   
  export default {      
    data(){
      return {
         search: '',
         searchQuery: null,
         pageOfItems: [],
         customStyles,
         customLabels,

         students:[],
         dialog: false,
         operation: '',            
            students:{
                id:null,
                name:'',
                email:''
            },     
      }
    },
/**
 * 
    computed:{
        filteredStudents: function(){
          return this.students.filter((blog) => {
            return blog.name.match(this.search);
           })
        }
    },
 * ****/
      computed:{
        resultQuery(){
            if(this.searchQuery){
            return this.students.filter((item)=>{
              return this.searchQuery.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v));
            })
            }else{
              return this.students;
            }
          }
      },
  
    created(){
       this.listStudents();    
      },

      methods:{

        onChangePage(pageOfItems) {
            this.pageOfItems = pageOfItems;
        },
        
        listStudents(){
            axios.get( Api )
              .then(response => {
                this.students = response.data
                console.log(this.students)  
              }).catch((error) => {
                console.log(error)
              })   
        },
       
        edit(){
            let parameter = {
                    name: this.students.name, 
                    email: this.students.email, 
                  };                                  
            //console.log(parameter);                   
                 axios.put( `${Api}/${this.students.id}`, parameter )                             
                  .then(response => {                                
                     this.listStudents();
                  })                
                  .catch(error => {
                      console.log(error);            
                  });
            },
        
        saveStudent(){
              if(this.operation == 'edit'){ 
                this.edit(); 
                Swal.fire('Student Edit!', '', 'success')                          
              }
              this.dialog=false;                        
            }, 
       
        formEdit(id, name, email){   
              this.students.id = id;   
              this.students.name = name;                            
              this.students.email = email;                            
              this.dialog = true;                            
              this.operation='edit';
            },

        remove(id){
             Swal.fire({
                title: 'Are you sure you want to delete this student?',   
                confirmButtonText: `Confirm`,                  
                showCancelButton: true,                          
              }).then((result) => {                
                if (result.isConfirmed) {      
                      axios.delete( `${Api}/${id}`)
                      .then(response => {           
                          this.listStudents();
                       });      
                      Swal.fire('Student Deleted!', '', 'success')
                  } else if (result.isDenied) {                  
                }
              });              
            },

      }

      
  }
</script>
