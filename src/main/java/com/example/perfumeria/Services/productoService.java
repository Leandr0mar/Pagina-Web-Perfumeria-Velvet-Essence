package com.example.perfumeria.Services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.stereotype.Service;

import com.example.perfumeria.Models.Perfurme;

@Service
public class productoService {
    
    private List<Perfurme> listaPerfumes = new ArrayList<>();

    public productoService() {
        // 1. BLACK GRAVITATION (MINISO)
        ArrayList<String> salidaGravitation = new ArrayList<>(Arrays.asList("Pomelo", "Notas marinas"));
        ArrayList<String> corazonGravitation = new ArrayList<>(Arrays.asList("Hoja de laurel", "Jazmín"));
        ArrayList<String> fondoGravitation = new ArrayList<>(Arrays.asList("Madera de guayaco", "Musgo de roble", "Pachulí", "Ámbar gris"));

        listaPerfumes.add(new Perfurme(
            1, 
            "Black Gravitation", 
            "Miniso", 
            "Eau de Parfum", 
            "Frasco de vidrio minimalista con atomizador negro", 
            "Una fragancia misteriosa que desafía la gravedad, ideal para envolverte en la calidez profunda de la noche.", 
            79.99, 
            15, 
            "Aromática Verde", 
            "Vaporizar en los puntos de pulso como muñecas, cuello y detrás de las orejas a una distancia de 15 cm.", 
            "100 ml", 
            "China", 
            salidaGravitation, 
            corazonGravitation, 
            fondoGravitation, 
            "/assets/hombre/Loci-n-para-hombre-black-gravitation-100ml-Miniso-1-26444.webp"
        ));

        // 2. NATURA HOMEM CLÁSICO (NATURA)
        ArrayList<String> salidaHomem = new ArrayList<>(Arrays.asList("Limón siciliano", "Mandarina", "Jengibre", "Bergamota"));
        ArrayList<String> corazonHomem = new ArrayList<>(Arrays.asList("Salvia", "Lavanda", "Pimienta negra", "Cardamomo"));
        ArrayList<String> fondoHomem = new ArrayList<>(Arrays.asList("Cedro", "Sándalo", "Ámbar", "Almizcle"));

        listaPerfumes.add(new Perfurme(
            2, 
            "Homem Clásico", 
            "Natura", 
            "Eau de Toilette", 
            "Frasco clásico transparente con tapa magnética texturizada", 
            "El equilibrio perfecto entre el frescor de los cítricos y la profunda elegancia de las maderas nobles.", 
            114.99, 
            0, 
            "Cítrica Amaderada", 
            "Aplicar directamente sobre la piel en áreas con alta pulsación sanguínea para maximizar la proyección.", 
            "100 ml", 
            "Brasil", 
            salidaHomem, 
            corazonHomem, 
            fondoHomem, 
            "/assets/hombre/Perfume Homem 1.webp"
        ));

        // 3. ESSENCIAL CLÁSICO (NATURA)
        ArrayList<String> salidaEssencial = new ArrayList<>(Arrays.asList("Bergamota", "Nuez moscada", "Albahaca", "Gálbano"));
        ArrayList<String> corazonEssencial = new ArrayList<>(Arrays.asList("Romero", "Pachulí", "Salvia", "Geranio"));
        ArrayList<String> fondoEssencial = new ArrayList<>(Arrays.asList("Cedro de Virginia", "Sándalo", "Mirra", "Musgo de roble"));

        listaPerfumes.add(new Perfurme(
            3, 
            "Essencial Clásico", 
            "Natura", 
            "Eau de Parfum", 
            "Elegante frasco de vidrio facetado asimétrico premium", 
            "Un manifiesto de sofisticación que combina notas verdes vibrantes con la imponente potencia de maderas profundas.", 
            149.99, 
            10, 
            "Aromática Fougère", 
            "Rociar en el torso, el cuello y las muñecas. Ideal para ocasiones formales, de noche o climas templados.", 
            "100 ml", 
            "Brasil", 
            salidaEssencial, 
            corazonEssencial, 
            fondoEssencial, 
            "/assets/hombre/Perfume-Essencial-Clasico-Masculino-100ml-Natura-1.webp"
        ));

        // 4. TEMPTATION (YANBAL)
        ArrayList<String> salidaTemptation = new ArrayList<>(Arrays.asList("Hojas de menta", "Néctar de mandarina"));
        ArrayList<String> corazonTemptation = new ArrayList<>(Arrays.asList("Flor de naranja", "Notas herbales frescas"));
        ArrayList<String> fondoTemptation = new ArrayList<>(Arrays.asList("Madera de sándalo", "Cedro masculino"));

        listaPerfumes.add(new Perfurme(
            4, 
            "Temptation", 
            "Yanbal", 
            "Eau de Parfum", 
            "Frasco estilizado y ergonómico que simula la silueta y firmeza masculina", 
            "Un aroma herbal maderoso altamente seductor de intensidad muy fuerte diseñado para el hombre que busca impresionar.", 
            189.99, 
            18, 
            "Herbal Maderosa", 
            "Aplicar generosamente en las muñecas y en la base del cuello. Evitar frotar las muñecas tras la aplicación.", 
            "100 ml", 
            "Perú", 
            salidaTemptation, 
            corazonTemptation, 
            fondoTemptation, 
            "/assets/hombre/perfume-masculino-temptation-yanbal-100-ml.webp"
        ));




        // 1. DOLCE (DOLCE & GABBANA)
        ArrayList<String> salidaDolce = new ArrayList<>(Arrays.asList("Flor de papaya", "Neroli"));
        ArrayList<String> corazonDolce = new ArrayList<>(Arrays.asList("Nenúfar (lirio de agua)", "Narciso", "Amarilis"));
        ArrayList<String> fondoDolce = new ArrayList<>(Arrays.asList("Almizcle", "Cachemira", "Sándalo"));

        listaPerfumes.add(new Perfurme(
            5, 
            "Dolce", 
            "Dolce & Gabbana", 
            "Eau de Parfum", 
            "Frasco de vidrio grueso y redondeado con tapón en forma de rosa blanca y lazo de grosgrain negro", 
            "Una fragancia sumamente delicada que captura la esencia de los campos de Sicilia con flores blancas recién cortadas.", 
            249.99, 
            8, 
            "Floral Blanca", 
            "Rociar sobre los puntos de pulso, especialmente detrás de las orejas y en las muñecas, a una distancia de 20 cm.", 
            "75 ml", 
            "Italia", 
            salidaDolce, 
            corazonDolce, 
            fondoDolce, 
            "/assets/mujer/Dolce Gabbana.webp"
        ));

        // 2. IMÁGENES (ÉSIKA)
        ArrayList<String> salidaImagenes = new ArrayList<>(Arrays.asList("Durazno", "Violeta", "Notas verdes"));
        ArrayList<String> corazonImagenes = new ArrayList<>(Arrays.asList("Ylang-ylang", "Jazmín", "Tuberosa", "Rosa"));
        ArrayList<String> fondoImagenes = new ArrayList<>(Arrays.asList("Sándalo", "Cedro", "Musk", "Ámbar"));

        listaPerfumes.add(new Perfurme(
            6, 
            "Imágenes", 
            "Ésika", 
            "Parfum", 
            "Frasco asimétrico facetado inspirado en la silueta de un diamante", 
            "Un aroma icónico de absoluta elegancia donde la sofisticación del ylang-ylang se funde con la fuerza del jazmín.", 
            79.99, 
            30, 
            "Floral Atalcada", 
            "Aplicar directamente en el cuello, las muñecas y los hombros después del baño para prolongar la fijación.", 
            "50 ml", 
            "Perú", 
            salidaImagenes, 
            corazonImagenes, 
            fondoImagenes, 
            "/assets/mujer/Imagenes Esika.webp"
        ));

        // 3. MISS L'BEL (L'BEL)
        ArrayList<String> salidaMiss = new ArrayList<>(Arrays.asList("Frambuesa negra", "Notas cítricas chispeantes"));
        ArrayList<String> corazonMiss = new ArrayList<>(Arrays.asList("Bouquet de rosas", "Flor de azahar"));
        ArrayList<String> fondoMiss = new ArrayList<>(Arrays.asList("Madera de sándalo", "Notas almizcladas suaves"));

        listaPerfumes.add(new Perfurme(
            7, 
            "Miss L'Bel", 
            "L'Bel", 
            "Parfum", 
            "Frasco estilizado y minimalista de vidrio transparente con un elegante lazo rosa en el cuello", 
            "Una fragancia icónica inspirada en la alta perfumería francesa, ideal para la mujer que resalta por su carisma.", 
            189.99, 
            12, 
            "Floral Frutal", 
            "Vaporizar en el torso y las muñecas. Se recomienda no frotar la piel para no romper la estructura de las rosas.", 
            "50 ml", 
            "Francia", 
            salidaMiss, 
            corazonMiss, 
            fondoMiss, 
            "/assets/mujer/Miss L'Bel.webp"
        ));

        // 4. PASIÓN (YANBAL)
        ArrayList<String> salidaPasion = new ArrayList<>(Arrays.asList("Violeta", "Notas de frutas silvestres"));
        ArrayList<String> corazonPasion = new ArrayList<>(Arrays.asList("Peonía blanca", "Notas florales de primavera"));
        ArrayList<String> fondoPasion = new ArrayList<>(Arrays.asList("Semillas de tonka", "Ámbar cálido"));

        listaPerfumes.add(new Perfurme(
            8, 
            "Pasión", 
            "Yanbal", 
            "Parfum", 
            "Frasco curvo y sinuoso de color morado translúcido de alta costura", 
            "Una invitación olfativa a celebrar la intensidad del romance mediante la sensualidad exótica de las peonías.", 
            129.99, 
            20, 
            "Ámbar Floral", 
            "Aplicar generosamente en las zonas de alta pulsación como el escote, el cuello y la cara interna de los codos.", 
            "50 ml", 
            "Colombia", 
            salidaPasion, 
            corazonPasion, 
            fondoPasion, 
            "/assets/mujer/Pasion Yanbal.webp"
        ));
    }

    public List<Perfurme> obtenerTodos() {
            return listaPerfumes;
        }

    public Perfurme buscarPorId(int id) {
            return listaPerfumes.stream()
                    .filter(p -> p.getId() == id)
                    .findFirst()
                    .orElse(null);
    }
}
