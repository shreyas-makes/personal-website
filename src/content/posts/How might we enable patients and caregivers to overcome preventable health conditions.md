---
title: "How might we enable patients and caregivers to overcome preventable health conditions?"
date: "2022-06-16T15:27:02.000Z"
slug: "bdres"
tags: [health, digital-health, projects]
stage: "plant"
---

For MCH, a study we conducted in 2021 observed strong evidence that the health messaging service (RES) improved maternal knowledge and infant care. It observed significantly higher rates of breastfeeding, safe infant-feeding practices, and skin-to-skin care among the intervention group, as well as greater knowledge of maternal nutrition, breastfeeding, and cord care best practices.


![](/images/2024/04/image-31-3.jpg)


****Intended Audience****—For product leaders and healthcare professionals working in the intersections of behaviour change, digital health and medical support

Imagine being a young mother-to-be, living in a remote village in Bangladesh, eagerly awaiting the birth of your child. You make the long journey to the nearest hospital for a routine check-up, filled with excitement.

But as you leave, a sense of uncertainty weighs heavy – how can you ensure you'll have the knowledge and support to care for your newborn properly?

For millions of marginalised patients and caregivers across Bangladesh, this is a harsh reality. Overstretched public health systems mean many leave healthcare facilities unprepared, risking preventable complications due to a lack of essential care knowledge.

But what if a simple technological solution could bridge that gap? A digital lifeline providing vital health education and support directly to those who need it most?

Over the past 30 months, my team has poured our heart, soul, and countless hours into developing just that – a Remote Engagement Service (RES) using accessible channels like **WhatsApp and voice calls**. And the impact has been lifesaving.

In this essay, I'll take you on the journey of Rabeya, that young expectant mother, and share the insights gained from our efforts with RES Bangladesh—

![upload in progress, 0](/images/2024/04/image-31.jpg)

A patient using the Remote Engagement Service (RES) on Whatsapp, listening in to an informative video on how to take better care of her baby

_While Rabeya eagerly waits for the doctor's appointment, she participates in the Care Companion Program, a health education service conducted by the nurses. Through simple language, the nurses provide guidance about the importance of nutrition, routine check-ups and self-care._

![upload in progress, 0](https://noorahealth.org/wp-content/uploads/2023/11/slider-3.jpg)

Rabeya is introduced to the RES service for the first time during the health education session conducted within the hospital

_At the end of the hospital session, the nurse encourages Rabeya to subscribe to_ **RES** _either through a QR code, or by directly calling the phone number._

![upload in progress, 0](https://lex-img-p.s3.us-west-2.amazonaws.com/img/d5912c5d-b518-4b2c-b465-ae0f4806e93a-RackMultipart20240427-148-hn6esy.png)

Three step process of onboarding users to the relevant health service

_Rabeya is onboarded to the service through a simple three-step process. She selects the campaign for expectant mothers, as well as her preferred medium (in this case, she chooses Whatsapp over a voice call service)._

![upload in progress, 0](https://lex-img-p.s3.us-west-2.amazonaws.com/img/333bdf43-53a4-4951-827c-514f14672262-RackMultipart20240427-134-kmgbyk.png)

_Once onboarded, she is gently nudged to enter her expected due date on Whatsapp. The RES service gets personalised based on this crucial timing._

![upload in progress, 0](/images/2024/04/27.jpg)

![upload in progress, 0](https://lex-img-p.s3.us-west-2.amazonaws.com/img/bb74c7f6-9a06-40d5-839e-ee43a8a0f176-RackMultipart20240427-129-qnsesb.png)

The content is tailored around the (a) desired health behavior and outcomes from the larger program, (b) specific asks from the government stakeholders, and (c) identified gaps in the patient journey

_As an expectant mother, Rabeya is guided towards doing her regular pregnancy checkups from nearby facilities. She is also reminded to take her iron and folic acid tablets on time._

_As she starts learning about various key topics, she starts asking questions surrounding her pregnancy. One day, she notices some signs in her body and remembers to seek help from the service._

![upload in progress, 0](/images/2024/04/22.jpg)

_In this way, she receives health support from clinical experts such as nurses and doctor as and when needed from the comfort of her home._

![upload in progress, 0](https://lex-img-p.s3.us-west-2.amazonaws.com/img/721194cc-0244-4437-924a-d3db84fdc2d5-RackMultipart20240427-185-ulnp8y.jpg)

An example of a health response provided by the medical team

![Video thumbnail](/media/2024/04/video--2-_thumb.jpg)

Rich media is used liberally to reinforce key health topics and to aid in retention

As shown from the journey of Rabeya, these are the core features of RES:

*   **Availability across multiple modalities:** WA (scheduled messages, chatbot, and live chat), Voice (IVRS), Teletraining (live calls)
*   **Availability across multiple condition areas:** MCH (Maternal and Child Health), NCD (Non Communicable Diseases), Cardiovascular, TB (Tuberculosis), General Surgery/Medicine
*   **Human-in-the-loop AI health responses:** Only medical experts provide health responses. By leveraging LLMs, responses are served in a reliable, accurate and efficient manner
*   **Provides Behavior Change Communications:** Both instructional and narrative styles of content, rich media (images, gifs, short-videos)
*   **Customized to stage and severity of need**

* * *

Journey behind building RES
---------------------------

I'll go one level deeper into the process followed—

![upload in progress, 0](/images/2024/04/MacBook-Air---1-1.jpg)

The product cycle went through various key phases such as ****Defining Business Outcomes, Discover, Validate, Build, Launch, Evaluate, and Iterate****.

Although this process appears neatly structured in hindsight, the reality of product development was more cyclical. As we gathered insights from our users, the problem space and solution space co-evolved, continuously shaping each other in response to new learnings.

Phases
------

### One—Defining Business/Impact Outcomes

The phases such as **Defining Business Outcomes, Discovery, Validation, Building, and Launching** might seem like disparate blocks, but they were all tied together by the vision. This **vision** serves as the connecting tissue, helping move the pieces together seamlessly, like a well-oiled engine without any jitters.

As a Business-to-Government-to-Consumer (B2G2C) model, we aimed to support Bangladesh government's health initiatives were focused on reducing the maternal mortality rate (MMR) and infant mortality rate (IMR). Bangladesh had roughly ~**157 maternal deaths per 100,000 live births**. To provide a benchmark, the Netherlands has ~4 maternal deaths per 100,000 live births. Noora Health's pitch to the government was to establish family caregiving as a standard of care, thereby reducing the MMR and IMR rates through the intervention.

![upload in progress, 0](/images/2024/04/MacBook-Air---2.jpg)

Noora Health's model consists of a cost-sharing model with health systems and funding support from a diversity of sources, including foundations, individuals, partnering organisations, and corporate giving. The cost sharing model allows Noora to eventually step-back from directly overseeing the program, enabling it to become an integrated and sustainable part of the healthcare infrastructure.

We got into our first MoU with the BD Health Ministry to pilot, gain evidence, and to integrate the program into the public health systems. That's how we started our operation.

My initial efforts during this phase was to make RES simple and easy to remember. To reduce the complexity in the communication, and to revive and evangelise interest towards RES, I showed a vision for RES BD—**Every user overcomes any preventable medical condition digitally**. Nurses were also trained to communicate RES in a simplified manner as—'**Health education for you and your baby**'.

![upload in progress, 0](/images/2024/04/MacBook-Air---8.jpg)

Framing the vision in the format of a 'future press-release' to get team/stakeholders excited about the RES vision

![upload in progress, 0](/images/2024/04/Group-146.jpg)

Creative Team at Noora Health assisted us in developing powerful visualisations through a storyboard to explain the ease with which one could get onboarded to the RES service

To make the direction of the vision even clearer, I worked closely with the Head of Product to break down the complex roadmap of RES into a simpler, more digestible format for all team members.

![upload in progress, 0](/images/2024/04/Frame-59.jpg)

We visualised RES as a train engine consisting of multiple blocks. We had the signup engine, an engagement engine, as well as a response engine. For each, we depicted the current state, and the future state to receive inputs from the larger team.

### **Discovery Phase**

Recognising that a direct replication of our previous strategies in India wouldn't suffice, we approached the situation with a fresh perspective.

My team and I explored the patient health journey across district hospitals, sub-district hospitals, and primary care centers in Bangladesh. This exploration aimed to map out how patients were accessing healthcare systems.

![upload in progress, 0](/images/2024/04/BD-CCP----Current-journey-in-SCANU--2-.jpg)

Mapping the current journey of a newly delivered mother

We were not optimising for a single user journey; rather, we addressed multiple journeys across various segments and touchpoints. Consider Rabeya's path—her experience extended far beyond that initial visit to the sub-district hospital.

> _Rabeya might attend her antenatal checkups at the local health complex, received home visits from community health workers, and may have even been referred to a higher-level facility for certain procedures or complications._

Each touchpoint represented a crucial opportunity to educate, empower and provide continuous support tailored to her evolving needs.

![upload in progress, 0](/images/2024/04/97.jpg)

Documenting the outcomes from the synthesis into various themes such as technology, personnel, health system etc. All these contributed to the drafting of the requirements

This synthesis ([through affinity maps](https://www.nngroup.com/articles/affinity-diagram/)) informed the initial draft of our [product requirements document](https://coda.io/@yuhki/figmas-approach-to-product-requirement-docs/prd-name-of-project-1), ensuring it was grounded in the diverse findings from our field and desk research. This helped us to imagine the **desired journey** in contrast to the current journey.

![upload in progress, 0](https://lex-img-p.s3.us-west-2.amazonaws.com/img/9363fe48-76a4-4cd4-9fd2-ba248f1083ee-RackMultipart20240427-136-7djnek.jpg)

Outlining decisions, the assumptions, and checkpoints on how we were validating the assumptions

![upload in progress, 0](/images/2024/04/Group-156.jpg)

Another framework which proved to be quite useful in digesting the complexity of the multi-touchpoint user journey was the [service blueprint.](https://www.google.com/search?q=service+blueprint&oq=service+blueprint&sourceid=chrome&ie=UTF-8)

![upload in progress, 0](/images/2024/04/shreyas-27-04-2024-at-21.30.47-1.gif)

[****Service blueprint****](https://www.google.com/search?q=service+blueprint&oq=service+blueprint&sourceid=chrome&ie=UTF-8) served as a great way to visualise and communicate not just the front stage actors, but the backstage actors, as well as the backend processes required to ensure everything is seamless.

Some key directions from our discovery phase:

**Voice calls as a primary medium**—During our discovery phase, we analyzed the overall usage of smartphones among the rural populations in Bangladesh. As of last year, **41% of mobile phone users** in the country had smartphones. With low WhatsApp penetration and internet usage being distributed among various platforms like Facebook and Emo, Interactive Voice Response (IVR) was chosen as the primary medium for our RES service. This decision was supported by our field observations and corroborated by reports, which indicated that often only one smartphone is available per family in rural areas​ ([The Business Standard](https://www.tbsnews.net/tech/62-bangladeshi-users-have-smartphones-2025-report-294121))​​ ([GSMA](https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/country-report-bangladesh/))​.

**Timing our service around date of discharge**—We designed our RES service to start immediately after a high-risk baby is discharged from the hospital, typically after 7-9 days. This timing aligns with one of our core design principles: to provide the right information at the right time. We adopted a similar strategy of timing our service while designing for diabetes patients, surgical care, newly delivered mothers etc.

**Contextualisation and personalisation of the messages—**RES campaigns were made more personalised to the geography they served. We adopted a more conversational format mixing curative, and promotive themes for behaviour change. We went on to also hire country specific teams across the Health Communications, Medical Strategy as well as Media/Film to ensure the content was adapted to the context.

![upload in progress, 0](/images/2024/04/104.jpg)

![upload in progress, 0](/images/2024/04/1.jpeg)

A typical SCANU facility in Bangladesh

All these guidelines and features were depicted in the product requirements doc that served as a means of garnering consensus, providing clarity to the respective engineering and design teams.

* * *

### **Validation Phase**

_Should we build and then test? Or should we test and then build?_

When facing this dilemma of whether to—_build and then test a product or to test and then build_, our approach varied based on the situation. As we always dealt with the trifecta of scope, time and effort, we needed a more structured approach to deal with these decisions. For more 'risky' features, we designed a lightweight pilot version first to test the concept in a controlled, manageable way. However, if the associated risks were minimal, we chose to launch first and then validate the feasibility afterwards as shown below—

![upload in progress, 0](/images/2024/04/MacBook-Air---5-1.jpg)

![upload in progress, 0](/images/2024/04/shreyas-28-04-2024-at-07.59-1-1.jpg)

This is an example of a feature which we implemented by testing first before building — For conversational IVR, as this was a high-impact and a crucial part of the onboarding flow, we didn't want to take any chances and performed a gradual rollout with significant period of testing internally by dogfooding

* * *

### **Build/Launch Phase**

Our product development process blended elements of both waterfall and agile methodologies, particularly crucial in the healthcare sector where careful planning of user-facing releases is imperative.

We methodically rolled out features over a 2.5-year timeline, carefully managing the evolution and growth of the service. The roadmap for what needed to be built was articulated in a detailed service map (as shown below), which facilitated collaborative feedback from all stakeholders. This ensured smooth transitions during technical handoffs, reducing risks and enhancing the effectiveness of our launches.

![upload in progress, 0](/images/2024/04/107-1.jpg)

This was a standard format used while we went ahead developing various features as a part of the product roadmap.

* * *

### **Evaluate Phase**

Before we evaluated, we didn't have proper systems to evaluate. When we started, we lacked a centralised product dashboard integrating data from various sources.

![upload in progress, 0](/images/2024/04/MacBook-Air---6-1.jpg)

12-month long ongoing effort by the Data Engineering Team to streamline data collection efforts, building systems towards data warehousing, establishing pipelines, as well as dashboarding

### Setting up systems for data-led evaluations

To support the tech team, I created early prototypes of the dashboard to demonstrate our requirements to the tech team. The visual prototypes proved to be useful for kickstarting conversations around the dashboard and gaining momentum to push it forward.

After diagnosing, and identifying the gaps, the data engineering team established pipelines, warehouses and the dashboard for helping us take data-driven decisions.

![upload in progress, 0](/images/2024/04/screenshot_2023-03-13_at_4.28.23_pm.png)

Early visualisations of the dashboard used in formulating the tech requirements. This eventually led to a full-fledged dashboard that helped improve the service over time

### Setting up systems for user-led feedback loops

To collect more insights from the field and from our users themselves using our service, we established a regular schedule of field visits for the RES team to engage directly with patients and caregivers. This allowed us to continuously gather and analyse data from various channels to better understand their needs.

![upload in progress, 0](/images/2024/04/108.jpg)

Key initiatives that I spearheaded to deepen our user-feedback loops included:

**Mid-campaign support calls—**These calls not only built trust with caregivers but also served as vital two-way communication channels. For instance, we discovered that 96% of our Whatsapp users read our messages, but struggled with literacy, impacting their understanding of the health-related content.

**End-campaign surveys and feedback—**Responses to our messages and updates from the delivery and implementation teams were crucial in synthesizing insights. On one occasion, we learned that users were sharing the RES contact number using takeaway cards among family members. This observation prompted us to redesign these cards to facilitate easier dissemination among patients and caregivers.

![Video thumbnail](/media/2024/04/video--1-_thumb.jpg)

**Taking effective decisions**—A good decision was a mix of taste, data and insights. After having set up systems to process data, systems for gaining user feedback, it became relatively easier to take crucial decisions. Taking both data and insights into the decision making process was quite crucial. In some cases, we had contradictory user viewpoints. Or in other cases, the data was quite contradictory to the user narrative.

_What people say, is different from what people do, is different from what people think._

**Example decision—Deciding between voice calls and Whatsapp**

In a recent strategic decision about expanding our service, we needed to determine the best communication channel for our users. The options were Whatsapp, Interactive Voice Response (IVR), or a combination of both (IVR+WA). To inform our decision, I analyzed user engagement data from the past quarter, comparing the interactions of IVR+WA users against those using only Whatsapp. Additionally, feedback from telesupport calls to current users provided further insights. This comprehensive analysis led us to adopt Whatsapp as our primary service platform, with an option to switch to IVR for users who became inactive. We found that while 40% of our users connected via Whatsapp, only 40% of those engaged actively responded to our messages.

**Example decision—Evaluating telesupport capacity**

During the first quarter of 2024, we observed a decline in telesupport productivity, with 28 team members averaging only 2-3 hours of calls per day. To enhance their efficiency without resorting to downsizing, I conducted detailed simulations. These simulations considered their current productivity, total working hours, and potential for additional tasks. Based on this data-driven analysis, we identified four new activities for the telesupport team. Implementing these activities significantly improved their productivity from 20% to 60%.

![upload in progress, 0](/images/2024/04/shreyas-28-04-2024-at-08.38.27@2x.jpg)

* * *

### **Iterate Phase**

One of my core philosophies in product development is to view each product as a work in progress that is never truly complete. This perspective reinforces the necessity for continuous improvement, as a product is never 'done'. In managing our development cycles, I advocate for a 70% focus on enhancing existing features (exploit) and 30% on exploring new possibilities (explore). This approach ensures that while we continuously refine our product, we also remain vigilant to emerging cultural, regulatory, economic, and technological trends. Exploration is conducted through a **'5C lens'—Customers, Collaborators, Competitors, Climate, and Company**—to identify and integrate new opportunities into our opportunity hypothesis.

![upload in progress, 0](/images/2024/04/100.jpg)

[****Digital Health Allies****](https://www.digitalhealthallies.com/): Improved the benchmarking process of researching partner organisations, and scoping out the possible collaborations through an independent platform. I designed this platform to make it easier for the partnerships team to filter out prospects for further reachouts.

For instance, we observed a growing trend in the use of large language models (LLMs) to deliver health-related information quickly and effectively. Inspired by this development, we integrated LLMs into RES, [primarily to enhance health intent recognition and support clinicians in providing faster, more accurate responses](https://noorahealth.github.io/LLM-Project-doc-site/).

In the exploitation phase—we focused on refining our core product—we devoted considerable efforts to structuring our response system more efficiently. This involved creating knowledge banks to prevent repetitive responses and formalising protocols through standard operating procedures.

![upload in progress, 0](/images/2024/04/102-1.jpg)

To reduce the waiting time for patients, as well as to efficiently use the time of doctors and experts, a ticketing system was setup on Freshdesk were queries were labelled, and organised to avoid answering repetitive questions.

![upload in progress, 0](/images/2024/04/101-1.jpg)

To bring more structure in the type of responses provided, as well as ensure that all responses are coherent in terms of tone, voice etc, standard operating procedures were drafted

**Incorporating Feedback**—Aligning stakeholders along the whole process was the most challenging part of this process. To solicit timely and relevant input from stakeholders, it was crucial to present them with the appropriate artefacts at the right level of fidelity. Overly detailed artefacts might deter critical feedback, while overly vague ones might not provide enough substance for meaningful commentary. We used one pagers, concept notes, mockups, and sometimes even service prototypes to gather feedback

![Video thumbnail](/media/2024/04/video_thumb.jpg)

Beyond simple concept notes, we often found it more effective to simulate the entire user journey through a walkthrough. This approach transformed the experience into an interactive role-play rather than just a static document, making the feedback process more engaging and insightful.

![upload in progress, 0](/images/2024/04/103.jpg)

**One Pagers** — Sometimes showing a prototype might feel like too much effort was put into its production that some stakeholders might avoid providing harsher feedback. They might feel that it's already well formed, and any critical comments would probably not be incorporated. To avoid this barrier, [concept notes/one-pagers](https://docs.google.com/document/u/0/d/1h4iMs3TSb06dO7_uDivRpGNBwSLMz08i5dDZ20v6GTo/mobilebasic) come in handy.

![upload in progress, 0](/images/2024/04/106.jpg)

One pager for the introduction of conversational IVR feature

**Medium Fidelity Prototypes** — When I usually build the case around the opportunity, and have to start from zero, momentum is gained with a medium-fidelity prototype. By putting an idea out there, even if it's totally wrong is much better catalyst for getting to a good solution as people are more likely to react to an idea than to nothing. Prototypes were a great source of enquiry. Prototyping was also my super-power and used my personal conviction to fuel the development of such prototypes.

![upload in progress, 0](/images/2024/04/99.jpg)

While setting up RES campaigns, we also observed the inefficiencies in the campaign setup process. Multiple team members logged entries on content spread across multiple spreadsheets which passed through various version edits. To streamline this process, we developed a medium-fidelity prototype of what we envisioned to get the larger team onboard. Noora CMS has automated various manual workflows improving the efficiency of the RES tech-ops team by 40% for campaign development

* * *

Imagine Rabeya's relief at receiving bite-sized WhatsApp lessons perfectly tailored to her needs as a new parent. Or the reassurance of having a supportive voice just a call away, ready to guide her through those inevitable anxious moments. For her, RES Bangladesh became a trustworthy companion on one of life's most profound journeys.

But the true measure of our success lies not in metrics, but in the countless lives touched.

> In parents empowered with knowledge.

> In preventable complications avoided.

> _In the smiles of healthy children born into a brighter future._[](https://ghost.org/help/using-the-editor/)