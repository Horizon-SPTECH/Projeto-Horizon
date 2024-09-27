package school.sptech;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {

        System.out.println("==================================");
        System.out.println("Olá, bem-vindo ao projeto Horizon!");
        System.out.println("==================================");

         List<String> listaData = new ArrayList<>();

        data resgatarData = new data();
        data resgatarHora = new data();

        System.out.println("A data de agora:");
        System.out.println(resgatarData.dataDoSistema());

        List<String> listaCadastro = new ArrayList<>();
        Scanner leitor = new Scanner(System.in);

        System.out.println("Nome da sua empresa:");
        listaCadastro.add(leitor.nextLine());
        listaData.add(resgatarData.dataDoSistema());
        System.out.println(resgatarHora.horaCalendario() + " | " + listaCadastro.get(0));

        System.out.println("Digite o nº da DP:");
        listaCadastro.add(leitor.nextLine());
        listaData.add(resgatarData.dataDoSistema());
        System.out.println(resgatarHora.horaCalendario()+ " | " + listaCadastro.get(1) + "º Delegacia policial");

        System.out.println("Na data de " + listaData.get(0) + " foi resgistrado " + "a empresa " + listaCadastro.get(0));
        System.out.println( "Na data de " + listaData.get(1) +  " foi resgistrado a " + listaCadastro.get(1) + "º Delegacia policial");

    }
}