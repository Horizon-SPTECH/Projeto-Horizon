package school.sptech;

import java.util.*;

public class data {
    String dataDoSistema(){
        Date relogio = new Date();

        return relogio.toString();
    }

    String horaCalendario(){
        Calendar c = Calendar.getInstance();

        Integer hora = c.get(Calendar.HOUR_OF_DAY);
        Integer minuto = c.get(Calendar.MINUTE);
        Integer segundos = c.get(Calendar.SECOND);


        String horaFormatada = String.format("%02d:%02d:%02d", hora, minuto, segundos);


        return horaFormatada;
    }
}
