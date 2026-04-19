---
title: How might we prevent acquired infections in hospitals?
description: >-
  What if you visited the hospital for a routine health checkup and ended up
  contracting an infection that required hospitalization? ! Sterilising high
  traffic hotspots within hospitals was the need of...
date: 2020-01-16T00:00:00.000Z
slug: uvfy
tags:
  - digital-health
  - rough-notes
stage: seedling
period: 2020-2021
company: UVfy
role: 'Co-founder, Product'
---

What if you visited the hospital for a routine health checkup and ended up contracting an infection that required hospitalization?

![[Attachments/images/2024/06/shreyas-15-06-2024-at-14.57.39.jpg]]

Sterilising high traffic hotspots within hospitals was the need of the hour.

With a shortage of masks, PPE, and a lack of effective disinfection systems in place, the hospitals in India were facing a massive challenge. COVID was rapidly spreading in hospitals, and 14% of all COVID patients were healthcare workers. Existing practises for hospital hygiene such as disinfecting solutions and fumigation techniques were rendered ineffective in frequently used spaces.

![[Attachments/images/2024/04/uvfy.png]]

To combat this issue, I joined the open-source hardware community during the pandemic lockdown and developed [Sterilo, a fabric-based sterilizer](https://github.com/openCOVIDIndia/Sterilo_portable_sterilizer) to prevent cross-contamination in isolation wards. This project won the MIT COVID-19 Challenge, helping us get an initial round of grant-based funding and helping us gain confidence to co-found Dverse Labs, and launch UVfy: an autonomous disinfection system for elevators.

What is UVfy? It’s an autonomous disinfection system for elevators that uses ultraviolet (UV-C) technology to kill dangerous disease-causing pathogens.

![[Attachments/images/2024/06/shreyas-15-06-2024-at-15.01.55@2x.jpg]]

![[Attachments/images/2024/06/Storyboard---Side-6.jpg]]

![[Attachments/images/2024/04/Impact---Slide-15.jpg]]

![[Attachments/images/2024/04/Intro---Slide-3.png]]

This was a computer vision based UV disinfection device that generates sufficient energy dose to reduce single-strand RNA virus (SARS CoV-2) to more than 99% in 5 minutes.

My role as a founding team member at Dverse Labs involved driving the vision, product strategy for UVfy, leading to its adoption across 7 hospitals in India with 3000+ daily active users (healthcare workers). Broadly, my responsibilities involved product design, user research, fundraising, website design, marketing and sales.

During this process of product development, we also utilised several AI/machine learning models to improve the accuracy of our detection systems for hospital safety. Our custom trained models were 98% accurate in identifying indoor occupancy, leading to successful medical approvals (CSIR empanelled labs) and adoption across various hospitals/metros in India. Through sufficient testing and validation, the AI-controlled UV disinfection device generated sufficient energy dose to reduce single-strand RNA virus (SARS CoV-2) to the 95 percentile within 5 minutes.

I also led the team of developers, designers and ǪA engineers and managed cross functional communication to launch the IoT product in 7 months (despite pandemic lockdown). 

* * *

## Product Development

Unlike a conventional double diamond design process, we followed a double helix process with knowledge loops - moving from business direction to the design to technology development and back. The problem and solution co-evolved owing to the dynamic market needs during the pandemic.

In the product development process, I was involved in user research, ideation, and concept development. The software simulation for testing the efficiency of the device was conducted by me. ​ I conducted pilot tests and observed user interactions in context.

![[Attachments/images/2024/04/Double-Helix---Slide-6.jpg]]

## User Research

  
Gaining insights from 120+ stakeholders, we tested our product through pilots in hotels, universities, hospitals. These paid pilots acted as 'proof-of-work' helping us validate and land our first client.

We narrowed down our ICP to doctors from hospitals with less than 300 beds. We spoke to over 30 doctors to understand hospital-acquired infections and their needs. We created a gigamap to understand all the elements and interconnections involved in the infection control system of a hospital.

Following our user research and secondary studies, we identified a clear need for disinfecting confined spaces like elevators without any human intervention. The risk of transmission was found to be 19 times higher in a confined space. Existing disinfection methods include fumigation, manual alcohol wipes, and UVC mobile bots. However, they are all ineffective.

Fumigation using hydrogen peroxide requires patient evacuation and 2-3 hours of exposure. In high traffic environments within hospitals, they cannot afford to close the operations of the space for longer time periods. On the other hand, having UVC robots sterilize after every patient visit hinders the use of the elevator and is not practically feasible. Manual wipes, if inappropriately used, can result in the transfer of pathogens from contaminated to clean surfaces. Moreover, ethanol based disinfectants, which is currently being used to clean surfaces- are not effective against multi-drug resistant pathogens.

The solutions had to be more systemic. You not only had to design for the patient but also take into account the doctors, management staff, infection control nurses etc.

![[Attachments/images/2024/04/Gigamap---Slide-8.png]]

## Concept Development

Based on our design goal, we went on to generate ideas. We tested out these different configurations with PVC pipes and LED lights. We also carried out UV-C light simulations of the product inside an elevator model with the actual dimensions, and with different wattage. This gave us insights into optimal UV wattage for uniform illumination and minimal shadowing.

We conducted preliminary tests to optimize the control systems with various sensors in my apartment elevator before building the alpha prototype.

Since elevators exist in every multi-story building we didn't want to restrict our market to hospitals. So we conducted pilot studies in hospitals, hotels, and apartments.

The pilot studies also served as a way to prototype our business and validate our value proposition assumptions with prospective customers from these different market segments. What we learned was that the value seen by hotels was different from hospitals. 

​For hospitals, it was about reducing the pathogen count. The hotels, however, wanted their customers to see that the hotel was doing something for them- the value was in giving them a perception of safety. Since our product wouldn't stay on when customers are inside, they wouldn't know what it did. So they wanted us to keep the lights on- but since this would be dangerous for users, we brainstormed on other ways to communicate this. But then as we saw a more urgent need in hospitals who saw the value of the product as it was, we went on to position our product for the hospital market segment.

![[Attachments/images/2024/06/123.png]]

## Product Strategy

As a B2B model, our primary customers are managing directors in hospitals. Our key partners included doctors, elevator companies (for approvals in installations), AMC service providers (for maintenance services post-warranty period). We are using evidence-based marketing through microbiological test results and certifications from ICMR impaneled labs. We provided a 1-year warranty and outsourced the AMC support. Multi-speciality hospitals across Tamil Nadu  
($8M) were our beachhead market.

![[Attachments/images/2024/06/123.jpg]]

![[Attachments/images/2024/06/123-1.jpg]]

We ended up iterating multiple times on our pitch, market, customers, product features etc. This was made possible through a system to integrate the feedback and translate them into actionable steps for the company.

Business (viability), Design (desirability) as well as engineering (feasibility) had to go hand in hand for us to make crucial decisions for the company. Along these lines, pricing strategy, revenue models, target segmentation etc came in handy to balance tech with business.

Cloud software to monitor the overall safety of the enclosed spaces. This was developed based on the needs of our B2B clients who insisted on having a software for monitoring the sterilisation

## Product Marketing

The value proposition we provided for our customers was through reduced patient stay and reduced staff absenteeism through reduced infections. The website served as an important marketing touchpoint to communicate this value to our B2B clients, and I designed the landing page experience for this purpose.

This was also communicated in a consistent form through brochures, lab test reports etc. Everything had to speak the same language.

![[Attachments/images/2024/06/1-website-1.webp]]

![[Attachments/images/2024/06/Design-for-Manufacturing---Slide-12.jpg]]

## Product Validation and Testing

One of the key questions asked by our clients was the overall validity of the product. It claims to reduce the risk of infections, but does it really do so?

But where is the proof of this? What's the scientific validation here?

To get a more thorough and rigorous understanding of this, we conducted a two-arm study with microbiological swab tests to evaluate and demonstrate the effectiveness of the UVfy system in deactivating pathogens across two hospital elevators.

![[Attachments/images/2024/06/shreyas-26-06-2024-at-10.47.31@2x.jpg]]

In each of the tests, two dry OT swabs were used to evaluate the sterility levels of two commonly infected surfaces inside the elevator car, side walls and floor. The swabs were collected from elevators A and B wherein the UVfy system was installed. The swabs taken in elevator C were for control tests (without UVfy system) since usage traffic flow is redistributed equally between all four elevators in the North block.

![[Attachments/images/2024/06/shreyas-26-06-2024-at-10.48.13@2x.jpg]]

Through our testing, we calculated UVfy to generate an equivalent of 0.690 mW/cm2 (6.9 J/m2 in 1 second) UV-C irradiance, sufficient to destroy genetic material of viruses like COVID19 / SARS-CoV2 which have a rate constant of 226 J/m2 (, Adenovirus (59 J/m2) and bacteria like E.coli (20 J/m2), Staphylococcus aureus (19 J/m2), Salmonella typhi (30 J/m2) and so on.

## Reflections

One key reflection from this experience is how I evolved as an industrial designer. I was eager to take a product from inception to launch, and then scale it up—this is when I truly grasped the principles of design.

Design doesn't exist in isolation; it comes to life through interaction with users. In this journey, I progressed from a mere concept to impacting hospitals daily, benefiting 3,000 healthcare workers. We faced many ups and downs; at one point, our growth stalled, and we had to pivot our startup to a completely different business model, which brought its own set of valuable lessons
