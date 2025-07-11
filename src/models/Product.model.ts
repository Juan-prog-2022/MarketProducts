import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

// Usamos decoradores de sequelize-typescript para definir el modelo Product
// y sus propiedades, incluyendo las validaciones y restricciones necesarias
@Table({
  tableName: "products"
})

// Definimos la clase Product que extiende de Model
// y contiene las propiedades que corresponden a las columnas de la tabla products
class Product extends Model {
    @Column(
        {type: DataType.STRING(100)}
    )
    declare name: string

    @Column({
        type: DataType.FLOAT(6, 2)
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability: boolean
}
// Exportamos el modelo Product para que pueda ser utilizado en otras partes de la aplicación
export default Product;