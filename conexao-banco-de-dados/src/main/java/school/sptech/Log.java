package school.sptech;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Log {

    public static String nomeArquivoLog(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
        String dataHora = LocalDateTime.now().format(formatter);

        return dataHora + "_aplicacao.log";
    }

    public static void inserirNoLog(String mensagem){
        String  nomeArquivo = nomeArquivoLog();

        try (FileWriter writer = new FileWriter(nomeArquivo,true)){
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String dataHoraAtual = LocalDateTime.now().format(formatter);
            writer.write(dataHoraAtual + " - " + mensagem + "\n");

        } catch (IOException e){
            System.err.println("Erro ao escrever no log: " + e.getMessage());
        }
    }
}
