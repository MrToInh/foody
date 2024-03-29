using Clothes_Factory;
using Clothes_Factory.Abstract_products;
using Clothes_Factory.Factories;
using Clothes_Factory.Products;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace Clothes_Factory
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private Shirt shirt;
        private Trousers trousers;

        private void Form1_Load(object sender, EventArgs e)
        {

        }
        private void showimage(string imagePath, PictureBox pictureBox)
        {
            try
            {
                if (System.IO.File.Exists(imagePath))
                {
                    Image image = Image.FromFile(imagePath);

                    pictureBox.Image = image;
                    pictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
                }
                else
                {
                    pictureBox.Image = null;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {

            int selectedIndex = comboBox1.SelectedIndex;
            showimage("C:\\Users\\Admin\\Documents\\GitHub\\foody\\Clothes Factory\\Clothes Factory\\Image\\ao" + (selectedIndex + 1) + ".png", pictureBox1);
            showimage("C:\\Users\\Admin\\Documents\\GitHub\\foody\\Clothes Factory\\Clothes Factory\\Image\\quan" + (selectedIndex + 1) + ".png", pictureBox2);

        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            int selectedIndex = comboBox1.SelectedIndex;
            ClothesFactory clothesFactory;

            switch (selectedIndex)
            {
                case 0:
                    clothesFactory = new ElegantClothesFactory();
                    break;
                case 1:
                    clothesFactory = new CasualClothesFactory();
                    break;
                default:
                    return;
            }

            shirt = clothesFactory.CreateShirt();
            trousers = clothesFactory.CreateTrousers();

        }
    }
}
