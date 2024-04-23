<p align="center">
  <b>HNF</b>
</p>
<p align="center">
  <b>HER NOISE FLOOR: SELECTION, EXTRACTION, EXCLUSION</b>
</p>
<p align="center">
  <b>AMIAS HANLEY</b><br>
  <b>2024</b>
</p>
<p align="center">
  MA Sound Arts<br>
  London College of Communication
</p>
<p align="center">
  <br>
</p>



Her Noise Floor: Selection, Extraction, Exclusion (HNF) is a practice-based research project, which responds to digital audio material that is housed within the Her Noise Archive at UAL Archives and Special Collections Centre.

The project specifically engages with five of the six radio programs from Melanie Clifford's Her Noise Series (2005). These programs were broadcast on Resonance Fm between 16.30 - 16.45 GMT throughout November and December 2005, coinciding with the Her Noise (2005) exhibition at the South London Gallery, curated by Lina Dzuverovic and Anne Hilde Neset. The audio recordings that are heard in these five programs all contain the presence of an audible noise floor. 
The noise floor is commonly considered to be the sum of all unwanted signals in an audio recording. That is the air conditioner, a bird’s song, a police siren or a child crying—depending on where you’re listening from. A recording’s noise floor can be influenced by the materials and spatial properties of the room or an environment. It can also be self-generated, by the thermal agitation of electrons that make up the circuitry of a recording device or microphone. In this sense, we might think of the noise floor as the result of millions of years of geologic formation.

The noise floor is often considered as “unwanted sound”, and disruptive in contrast to the desired “signal”. Here, the noise floor may share parallels with how the artists and curators of Her Noise (2005) were perceived in contrast to their male peers at the time, as they ‘set out to insert the “missing women” into art history’ (Džuverović, 2016, p. 89). HNF asks—what can the noise floor in these archived recordings tell us about the histories, social relations, climate, and economic and geopolitical context in which the Her Noise (2005) exhibition originated? 


**HNF PROJECT DESCRIPTION**

Through the framework of digital labour relations, extractivism, and machine learning, HNF aims to situate the noise floor as a highly localised, non-neutral, audible ecological material, which holds traces of global techno-political structures and climate systems. Throughout this project, the noise floor is explored as both an archive of the in-situ acoustic properties of the rooms and places where these recordings were made and as a cartography of the geosocial conditions and curatorial decisions that produced the Her Noise (2005) exhibition.

In this way, the noise floor can be understood as a ‘material witness’, as conceptualised by Susan Schuppli (2020). For Schuppli material witnesses are “... nonhuman entities and machinic ecologies that archive their complex interactions with the world, producing ontological transformations and informatic dispositions that can be forensically decoded and reassembled back into a history” (Schuppli, 2020, p. 3).

A central motivation in creating this work has been to engage with machine learning processes, to understand how they work and what their possibilities, limitations, consequences and influences are. This coincides with my aims to contribute towards demystifying, democratising, and diversifying machine learning algorithms and machine listening technologies, so that a wider variety of people can explore their possibilities in ways that empower them and benefit their communities. Furthermore, to re-ground these systems and processes in the earth, in an effort to minimise the potentially harmful consequences that result from falsely and recklessly positioning these technologies in the “cloud”.

Similarly to the way that Her Noise (2005) curator Lina Džuverović describes “...in our own curatorial work we had unknowingly replicated the mechanisms inherent in patriarchy perfectly” (2016, p. 90), datasets that are used to train machine learning models reflect the ideological contexts, perspectives, values, and lived experiences of the humans that produce them. Here, I have sought to question—what can I learn about my own listening processes and biases, and the political economy of noise, through extracting “noise” and “signal” from these archived audio recordings and creating a dataset? And how might audio classification models draw on conventional listening histories?


**CREATIVE RESEARCH OUTPUT**

Her Noise Floor: Selection, Extraction, Exclusion consists of two interrelated, process-driven parts:

1) A machine learning model, trained on an audio dataset created from the Her Noise Archive, which is built for audio classification purposes, specifically to classify whether an audio file is “noise” or “signal”.
   
2) An interactive browser-based noise map, which functions as an experimental archive and compositional tool, allowing users to listen to the HNF dataset, engage with predictions made by the model, and explore the noise floor as ecological material. 


**HNF MACHINE LEARNING MODEL**  

Building the HNF Audio Classification Model involved several stages. As I am new to the process, I first engaged with several online articles and tutorials (Nantasenamat, 2020; Oluyale, 2023; Renotte, 2022) to develop an understanding of the steps required to build and train a machine learning model and used these experiences to inform my approach towards the task. The process of researching, creating datasets, testing, and training (multiple) models developed over a three-month timeline. There have been numerous hurdles, particularly in understanding the implications of datasets in machine learning pipelines. However, fortunately, the process lends itself to an iterative approach, as the feedback from testing and training the model is immediate and many resources for problem-solving are available online. 

**Steps in Building the Audio Classification Model** 

I used three specific guides (Nantasenamat, 2020; Oluyale, 2023; Renotte, 2022) to develop the steps required to build the HNF Audio Classification Model. The process can be broken down into the following four steps.  

1. Dataset Creation and Preparation  

From the five Her Noise Radio programs, I created a dataset of 100 audio files, the duration of these audio files ranges from 0.2 to 12 seconds. I then categorised the 100 files into two even classes: “signal” and “noise”. This dataset was then split in half — 25 “signal” samples and 25 “noise” samples were used to train the model. While the remaining 50 samples were reserved for evaluation (by the trained model). At this stage, data values related to the files, such as time, date, location, weather, etc., were collected in a spreadsheet.
  
**2. Data Pre-processing** 

Once I had prepared the audio dataset, I used the web-based coding environment ‘Colab’ to execute the code that is required to load the audio dataset, convert the audio data into a Mel spectrograms and resize the spectrograms to ensure they are compatible with the neural network. This model uses a convolutional neural network (CNN) to process the audio data that has been transformed into a spectrogram.

**3. Building the Model, Model Architecture, Compiling and Training the Model**

The model architecture consists of the following layers: an input layer with the resized spectrograms, two convolutional layers, a flattened layer, a dense hidden layer, and an output layer with as many neurons as there are classes, in this case, two: “signal” and “noise”, and a softmax activation function to produce class probabilities. The model is compiled using TensorFlow, Keras and Adam and an accuracy metric is used to monitor the model’s performance during training. With the model architecture in place, the model is then trained on the pre-processed dataset (Oluyale, 2023).

**4. Model Evaluation and Testing the Model on the HNF Dataset:**

After training, the model is evaluated and tested on the reserved files from the HNF dataset. The model’s accuracy is calculated, which tells us how well the model performs on unseen data. After months of testing different models and creating variations in the datasets, a stable model was trained. 
In an attempt to create a diverse representation of “noise” in the HNF Interactive Noise Map, two separate models were used in this project. One was trained on data from Her Noise Radio episodes 4 - 5, and then tested on episodes 1 - 3. The second model was trained on episodes 1 - 3 and tested on episodes 4 - 5. This way the data that is included in the HNF Interactive Noise Map is derived from all five episodes. 
When evaluated, both models returned an accuracy 0.800000011920929, which means that, on average, the models correctly predict the target variable for 80% of the instances in the test set. I am pleased with the performance of the model—given the small size of the dataset, a higher accuracy could indicate overfitting.  

When tested on the unseen HNF dataset, containing the reserved samples (25 “signal” and 25 “noise”), the models made the following classifications:

**Model 1**
Total samples categorised as “noise”: 30
Total samples categorised as “signal”: 20

**Model 2**
Total samples categorised as “noise”: 27
Total samples categorised as “signal”: 23

The number of samples that were classified as “noise” total 57, which exceeds the requirements for the interactive HNF Interactive Noise Map. To address this, I used a Python script to randomly select a subset of 15 samples from the “signal” class. I then curated the selection further through my own listening and evaluation of differences in duration and location among the classified samples. The final result being a total of 15 “noise” files that form the basis for the HNF Interactive Noise Map. 
Both the HNF dataset (100 files; signal/noise) and the code to execute this model are available at the HNF GitHub repository.


**HNF INTERACTIVE NOISE MAP** 

The HNF Interactive Noise Map aims to provide a playful, pedagogical, and experimental site for listening, composition, and interfacing with the Her Noise Archive and the HNF Audio Classification Model.   
When a listener arrives at the map, they encounter multiple sound objects, represented as simple rectangles. There are a total of 30 sound objects for the listener to navigate; half of them are yellow and contain the unprocessed “noise” samples, classified by the model (denoted by the letters HNF). The other half are black and contain the same samples, however, these samples have been processed using a third-party denoiser plugin, (denoted by the letters BPF). The denoiser, developed by Izotope, has been trained using complex algorithmic processes, and is used to extract select frequency bands within the “noise” sample, while attenuating and blocking signals outside this range, resulting in a drone-like expression.
When a listener clicks on a sound object this triggers a text pop-up and the audio file plays on a loop. The text pop-up that corresponds to the yellow HNF sound objects contains information that is linked to local contributors to the noise floor (e.g. time, date, location, weather, etc.). While the text pop-up corresponding to the black BPF sound objects contain information that links the noise floor to its planetary context (e.g. rare minerals used to manufacture audio technologies, digital labour relations, supply chains, climate, etc.).
In navigating the HNF Interactive Noise Map, I hope that listeners may actively explore the noise floor as ecological material, as a ‘tangled cartography’ (Hilde Neset, 2007) that illuminates techno-political systems relative to a politics of listening and acts as a contemporary continuation of Her Noise Archive. The HNF Interactive Noise Map aims to pay homage to the mapping processes used by the curators, Lina Dzuverovic and Anne Hilde Neset at the inception of Her Noise (2005), and provide a place to reimagine, rearrange, and relisten to the material conditions of the past through emergent auditory technocultures. 


**WORKS CITED**


Džuverović. L. 2016. ‘Twice Erased: The Silencing of Feminisms in Her Noise’, 
Women and Music: A Journal of Gender and Culture, Volume 20, pp. 88-95. DOI: https://doi.org/10.1353/wam.2016.0005 

Her Noise. 2005.  [Exhibition]. London, UK. 10 November – 18 December. Available at: https://www.southlondongallery.org/exhibitions/her-noise/. (Accessed: 1 February 2024).

Her Noise Series. 2005. Resonance Fm, November - December, 16.30 - 16.45 GMT. 

Hilde Neset, A. 2007. A Tangled Cartography; The Mapping of Her Noise. Available at: https://hernoise.org/tangled-cartography/. (Accessed: 1 February 2024).
 
Nantasenamat, C. 2020. How to Build a Machine Learning Model: A Visual Guide to Learning Data cience. Available at:  https://towardSsdatascience.com/how-to-build-a-machine-learning-model-439ab8fb3fb1.  (Accessed: 1 February 2024).

Oluyale, D., 2023. Audio Classification using Deep Learning and TensorFlow: A Step-by-Step Guide. Medium. Available at: https://medium.com/@oluyaled/audio-classification-using-deep-learning-and-tensorflow-a-step-by-step-guide-5327467ee9ab. (Accessed: 1 February 2024).

Renotte. N. 2022. Build a Deep Audio Classifier with Python and Tensorflow. Available at: https://youtu.be/ZLIPkmmDJAc?si=dclktUDgt09odOPf.  (Accessed: 1 February 2024).

Schuppli, S. 2020. Material Witness : Media, Forensics, Evidence, MIT Press.





