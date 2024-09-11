package school.sptech;

import java.util.*;

public class data {
    String dataDoSistema(){
        Date relogio = new Date();

        return relogio.toString();
    }

    String horaCalendario(){
        Calendar c = Calendar.getInstance();

        Integer hora = c.get(Calendar.HOUR);
        Integer minuto = c.get(Calendar.MINUTE);
        Integer segundos = c.get(Calendar.SECOND);

        String horaFormatada = hora.toString() + ":" + minuto.toString() + ":" + segundos.toString();
        return horaFormatada;
    }
}
