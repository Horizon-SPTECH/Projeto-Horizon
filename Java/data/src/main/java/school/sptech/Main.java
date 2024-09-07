package school.sptech;

import java.util.Date;

public class Main {
    public static void main(String[] args) {

        System.out.println("==================================");
        System.out.println("Olá, bem-vindo ao projeto Horizon!");
        System.out.println("==================================");

        data resgatarData = new data();

        System.out.println("A data do sistema é ");
        System.out.println(resgatarData.dataDoSistema());
    }
}