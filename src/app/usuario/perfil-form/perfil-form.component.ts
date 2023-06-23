import { Component, Input } from '@angular/core';
import { Perfil } from '../../interfaces/usuario.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styles: [
  ]
})
export class PerfilFormComponent {
  
}
