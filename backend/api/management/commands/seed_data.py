"""
Seed data command - populate database with comprehensive sample data.
Run: python manage.py seed_data

Seeds all models: Tender, News, Career, ProjectStat, BoardMember, 
Project, Milestone, SustainabilityStat, CSRInitiative
"""

from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from api.models import (
    Tender, News, Career, ProjectStat, 
    BoardMember, Project, Milestone, 
    SustainabilityStat, CSRInitiative
)


class Command(BaseCommand):
    help = 'Seed database with comprehensive sample data for all models'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('🗑️  Clearing existing data...'))
        
        # Clear existing data (order matters for foreign keys)
        Tender.objects.all().delete()
        News.objects.all().delete()
        Career.objects.all().delete()
        ProjectStat.objects.all().delete()
        BoardMember.objects.all().delete()
        Project.objects.all().delete()
        Milestone.objects.all().delete()
        SustainabilityStat.objects.all().delete()
        CSRInitiative.objects.all().delete()
        
        self.seed_project_stats()
        self.seed_board_members()
        self.seed_projects()
        self.seed_milestones()
        self.seed_sustainability_stats()
        self.seed_csr_initiatives()
        self.seed_tenders()
        self.seed_news()
        self.seed_careers()
        
        self.stdout.write(self.style.SUCCESS('\n✅ Database seeded successfully!'))

    def seed_project_stats(self):
        """Seed homepage statistics."""
        stats = [
            {'label': 'Installed Capacity', 'value': 1320, 'suffix': ' MW', 'icon': '⚡', 'order': 1},
            {'label': 'Investment', 'value': 15000, 'suffix': ' Cr', 'icon': '💰', 'order': 2},
            {'label': 'Workforce', 'value': 5000, 'suffix': '+', 'icon': '👥', 'order': 3},
            {'label': 'Safety Hours', 'value': 10, 'suffix': 'M+', 'icon': '🛡️', 'order': 4},
        ]
        for stat in stats:
            ProjectStat.objects.create(**stat)
        self.stdout.write(self.style.SUCCESS(f'📊 Created {len(stats)} project stats'))

    def seed_board_members(self):
        """Seed board of directors."""
        members = [
            {
                'name': 'Shri Raj Kumar Singh',
                'title': 'Chairman, BIFPCL',
                'bio': 'Union Minister of Power and New & Renewable Energy, Government of India. Leading the board with a vision for sustainable energy cooperation between Bangladesh and India.',
                'image_url': '/images/director-1.png',
                'is_chairman': True,
                'order': 1,
            },
            {
                'name': 'Mr. Mohammed Hossain',
                'title': 'Managing Director, BIFPCL',
                'bio': 'Over 30 years experience in power sector management and international energy cooperation. Spearheading operational excellence at Maitree STPP.',
                'image_url': '/images/director-2.png',
                'is_chairman': False,
                'order': 2,
            },
            {
                'name': 'Mr. Nasrul Hamid Bipu, MP',
                'title': 'Director (Bangladesh)',
                'bio': 'State Minister for Power, Energy and Mineral Resources, Government of Bangladesh. Champion of Bangladesh\'s energy security initiatives.',
                'image_url': '/images/director-3.png',
                'is_chairman': False,
                'order': 3,
            },
            {
                'name': 'Mr. S.K. Roy',
                'title': 'Director (India)',
                'bio': 'Director from NTPC Limited, bringing decades of thermal power expertise and operational best practices from India\'s largest power company.',
                'image_url': '/images/director-4.png',
                'is_chairman': False,
                'order': 4,
            },
            {
                'name': 'Mr. K.M. Rahman',
                'title': 'Director (Bangladesh)',
                'bio': 'Senior representative from Bangladesh Power Development Board (BPDB). Expert in power sector planning and grid management.',
                'image_url': '/images/director-5.png',
                'is_chairman': False,
                'order': 5,
            },
            {
                'name': 'Mr. A.K. Sharma',
                'title': 'Director (India)',
                'bio': 'Senior representative from NTPC Limited with expertise in power plant operations, maintenance, and project management.',
                'image_url': '/images/director-6.png',
                'is_chairman': False,
                'order': 6,
            },
        ]
        for member in members:
            BoardMember.objects.create(**member)
        self.stdout.write(self.style.SUCCESS(f'👥 Created {len(members)} board members'))

    def seed_projects(self):
        """Seed power projects."""
        projects = [
            {
                'name': 'Maitree Super Thermal Power Project',
                'location': 'Rampal, Bagerhat, Bangladesh',
                'description': 'Ultra-supercritical coal-fired thermal power plant, a symbol of Bangladesh-India friendship and cooperation. The flagship project featuring advanced environmental protection measures.',
                'capacity': '1320 MW',
                'status': 'operational',
                'category': 'coal',
                'image_url': '/images/hero-1.png',
                'efficiency': '>41%',
                'is_featured': True,
            },
            {
                'name': 'Unit-1 (660 MW)',
                'location': 'Rampal, Bagerhat',
                'description': 'First generating unit of Maitree STPP, synchronized with national grid in August 2022 and delivering reliable base-load power.',
                'capacity': '660 MW',
                'status': 'operational',
                'category': 'coal',
                'image_url': '/images/hero-2.png',
                'efficiency': '>41%',
                'is_featured': False,
            },
            {
                'name': 'Unit-2 (660 MW)',
                'location': 'Rampal, Bagerhat',
                'description': 'Second generating unit with ultra-supercritical technology for maximum efficiency. Commercial operation achieved in December 2023.',
                'capacity': '660 MW',
                'status': 'operational',
                'category': 'coal',
                'image_url': '/images/hero-3.png',
                'efficiency': '>41%',
                'is_featured': False,
            },
            {
                'name': 'Green Belt Development',
                'location': 'Rampal, Bagerhat',
                'description': 'Massive afforestation initiative with over 542,000 trees planted around the project area. Creating a green buffer zone for environmental protection.',
                'capacity': '542K Trees',
                'status': 'operational',
                'category': 'solar',  # Using for environmental projects
                'image_url': '/images/sustainability-hero.png',
                'efficiency': 'N/A',
                'is_featured': False,
            },
        ]
        for project in projects:
            Project.objects.create(**project)
        self.stdout.write(self.style.SUCCESS(f'🏭 Created {len(projects)} projects'))

    def seed_milestones(self):
        """Seed company timeline milestones."""
        milestones = [
            {
                'year': 2010,
                'title': 'Framework Agreement',
                'description': 'Framework agreement signed between Bangladesh and India for power cooperation during PM-level bilateral talks.',
                'order': 1,
            },
            {
                'year': 2012,
                'title': 'BIFPCL Established',
                'description': 'Bangladesh-India Friendship Power Company (Pvt.) Limited incorporated as 50:50 joint venture between BPDB and NTPC.',
                'order': 2,
            },
            {
                'year': 2013,
                'title': 'CCEA Approval',
                'description': 'Cabinet Committee on Economic Affairs, Government of India, approved the Maitree STPP project.',
                'order': 3,
            },
            {
                'year': 2016,
                'title': 'Construction Begins',
                'description': 'Ground-breaking ceremony held. Main plant construction initiated with world-class contractors.',
                'order': 4,
            },
            {
                'year': 2017,
                'title': 'Financial Closure',
                'description': 'Loan agreement signed with EXIM Bank of India for project financing.',
                'order': 5,
            },
            {
                'year': 2022,
                'title': 'Unit-1 Synchronized',
                'description': 'First 660 MW unit synchronized with national grid of Bangladesh in August 2022.',
                'order': 6,
            },
            {
                'year': 2023,
                'title': 'Full Commercial Operation',
                'description': 'Both units operational, delivering 1320 MW to Bangladesh. Plant declared commercially operational.',
                'order': 7,
            },
        ]
        for milestone in milestones:
            Milestone.objects.create(**milestone)
        self.stdout.write(self.style.SUCCESS(f'📅 Created {len(milestones)} milestones'))

    def seed_sustainability_stats(self):
        """Seed CSR and sustainability statistics."""
        stats = [
            {'label': 'Trees Planted', 'value': '542,000+', 'trend': '+15.4% YoY', 'icon': '🌳', 'order': 1},
            {'label': 'Water Recycled', 'value': '88%', 'trend': 'Zero Liquid Discharge', 'icon': '💧', 'order': 2},
            {'label': 'Carbon Reduction', 'value': '22%', 'trend': 'Ultra-supercritical Tech', 'icon': '🌍', 'order': 3},
            {'label': 'CSR Investment', 'value': '৳15 Cr+', 'trend': 'Annual Budget', 'icon': '🤝', 'order': 4},
            {'label': 'Fly Ash Utilization', 'value': '100%', 'trend': 'Sustainable Bricks', 'icon': '♻️', 'order': 5},
            {'label': 'Safety Record', 'value': '10M+ Hours', 'trend': 'Zero LTI', 'icon': '🛡️', 'order': 6},
        ]
        for stat in stats:
            SustainabilityStat.objects.create(**stat)
        self.stdout.write(self.style.SUCCESS(f'🌱 Created {len(stats)} sustainability stats'))

    def seed_csr_initiatives(self):
        """Seed CSR initiatives and programs."""
        initiatives = [
            {
                'title': 'Education Support Program',
                'description': 'Annual scholarships for 500+ local students, school infrastructure upgrades, computer labs, and teacher training programs in Rampal and surrounding areas.',
                'category': 'education',
                'impact_metric': '5000+ students benefited',
                'image_url': '/images/csr-education.png',
            },
            {
                'title': 'Mobile Health Clinics',
                'description': 'Free primary healthcare services to 12 villages weekly via dedicated mobile medical units. Regular health camps and awareness programs.',
                'category': 'health',
                'impact_metric': '50,000+ patients treated annually',
                'image_url': '/images/csr-health.png',
            },
            {
                'title': 'Green Belt Initiative',
                'description': 'Afforestation program with 542,000+ trees planted around the project area. Creating a sustainable ecosystem and green buffer zone.',
                'category': 'environment',
                'impact_metric': '542,000+ trees planted',
                'image_url': '/images/sustainability-hero.png',
            },
            {
                'title': 'Skill Development Training',
                'description': 'Vocational training programs for local youth in electrical, welding, and other technical skills. Creating employment opportunities in the power sector.',
                'category': 'livelihood',
                'impact_metric': '1000+ trained annually',
                'image_url': '/images/hero-2.png',
            },
            {
                'title': 'Clean Drinking Water',
                'description': 'Installation of deep tube wells and water purification systems in nearby villages. Ensuring access to safe drinking water for all.',
                'category': 'health',
                'impact_metric': '15 villages covered',
                'image_url': '/images/hero-3.png',
            },
        ]
        for initiative in initiatives:
            CSRInitiative.objects.create(**initiative)
        self.stdout.write(self.style.SUCCESS(f'❤️ Created {len(initiatives)} CSR initiatives'))

    def seed_tenders(self):
        """Seed tender/procurement announcements."""
        tenders = [
            {
                'title': 'Supply of Imported Coal for Power Generation',
                'description': 'Procurement of high-grade thermal coal for continuous power generation operations at Unit 1 & 2. Minimum calorific value of 5500 kcal/kg required. Annual requirement: 4.5 million tonnes.',
                'reference_number': 'BIFPCL/TENDER/2026/001',
                'deadline': timezone.now() + timedelta(days=30),
                'category': 'goods',
            },
            {
                'title': 'Annual Maintenance Contract for Steam Turbines',
                'description': 'Comprehensive maintenance services for 2x660 MW steam turbine generators including spare parts, technical support, and emergency repairs. 3-year contract with extension option.',
                'reference_number': 'BIFPCL/TENDER/2026/002',
                'deadline': timezone.now() + timedelta(days=45),
                'category': 'services',
            },
            {
                'title': 'Construction of Ash Pond Extension Phase-II',
                'description': 'Civil works for expansion of existing ash pond facility including earthwork, HDPE lining, drainage systems, and monitoring infrastructure.',
                'reference_number': 'BIFPCL/TENDER/2026/003',
                'deadline': timezone.now() + timedelta(days=60),
                'category': 'works',
            },
            {
                'title': 'Environmental Impact Assessment Study 2026-2030',
                'description': 'Consultancy services for comprehensive 5-year EIA study, environmental monitoring program, and regulatory compliance support.',
                'reference_number': 'BIFPCL/TENDER/2026/004',
                'deadline': timezone.now() + timedelta(days=20),
                'category': 'consultancy',
            },
            {
                'title': 'Procurement of Personal Protective Equipment',
                'description': 'Supply of PPE including safety helmets, fire-resistant clothing, safety shoes, and respiratory protection for 5000+ personnel.',
                'reference_number': 'BIFPCL/TENDER/2026/005',
                'deadline': timezone.now() + timedelta(days=15),
                'category': 'goods',
            },
            {
                'title': 'IT Infrastructure Upgrade',
                'description': 'Supply and installation of network infrastructure, servers, and cybersecurity systems for plant operations and corporate offices.',
                'reference_number': 'BIFPCL/TENDER/2026/006',
                'deadline': timezone.now() + timedelta(days=25),
                'category': 'goods',
            },
            {
                'title': 'Canteen and Catering Services',
                'description': 'Comprehensive catering services for 3000+ employees at plant site. 3-year contract including kitchen equipment and management.',
                'reference_number': 'BIFPCL/TENDER/2026/007',
                'deadline': timezone.now() + timedelta(days=35),
                'category': 'services',
            },
        ]
        for tender in tenders:
            Tender.objects.create(**tender)
        self.stdout.write(self.style.SUCCESS(f'📋 Created {len(tenders)} tenders'))

    def seed_news(self):
        """Seed news and announcements."""
        news_articles = [
            {
                'title': 'BIFPCL Achieves 100% Commercial Operation',
                'content': '''Bangladesh India Friendship Power Company Limited has achieved a major milestone with both 660 MW units now operating at full commercial capacity.

This marks a significant achievement in Bangladesh-India bilateral cooperation and energy security. The Maitree Super Thermal Power Project is now delivering 1320 MW of reliable base-load power to the national grid.

The ultra-supercritical technology employed ensures efficiency above 41%, significantly reducing emissions compared to conventional coal plants. This achievement was made possible through the dedicated efforts of over 5000 workers and world-class engineering expertise.''',
                'summary': 'Both 660 MW units are now fully operational, marking a historic milestone for the joint venture.',
                'is_featured': True,
                'image_url': '/images/news-1.png',
            },
            {
                'title': 'Prime Minister Visits Rampal Power Plant',
                'content': '''The Honorable Prime Minister visited the Rampal Power Plant and expressed satisfaction with the progress of the project.

During the visit, the PM toured the main plant area, control room, and environmental management facilities. The PM praised the engineering excellence and comprehensive environmental safeguards implemented at the plant.

"This project stands as a testament to the strong friendship between Bangladesh and India," the PM remarked. "It will play a crucial role in our journey towards energy security and economic development."''',
                'summary': 'PM lauds progress and environmental measures at the power plant during official visit.',
                'is_featured': True,
                'image_url': '/images/news-2.png',
            },
            {
                'title': 'New Continuous Emission Monitoring System Installed',
                'content': '''BIFPCL has installed state-of-the-art Continuous Emission Monitoring Systems (CEMS) at both generating units.

The system provides real-time data on emissions including particulate matter, SOx, and NOx. Data is automatically transmitted to the Department of Environment for transparency and regulatory compliance.

This installation reinforces BIFPCL's commitment to environmental responsibility and exceeds regulatory requirements.''',
                'summary': 'Advanced CEMS ensures environmental compliance and transparency in emissions monitoring.',
                'is_featured': False,
                'image_url': '/images/hero-1.png',
            },
            {
                'title': 'Community Development Program Expands to 20 Villages',
                'content': '''BIFPCL has expanded its comprehensive community development initiatives to 20 villages in the Rampal and surrounding areas.

The program includes education scholarships for 500+ students, mobile healthcare services, vocational training, and clean water access. Over ৳15 crore has been invested in CSR activities this year.

Local community leaders have expressed appreciation for the company's commitment to sustainable development.''',
                'summary': 'CSR program now covers 20 villages with education, healthcare, and livelihood support.',
                'is_featured': False,
                'image_url': '/images/csr-education.png',
            },
            {
                'title': 'Safety Excellence Award 2025',
                'content': '''BIFPCL received the National Safety Excellence Award for maintaining zero lost-time incidents for 18 consecutive months.

The award recognizes the company's world-class safety culture and comprehensive training programs. Over 10 million safe man-hours have been achieved since commercial operation began.

"Safety is not just a priority, it's a core value," said the Managing Director.''',
                'summary': 'Recognition for outstanding safety record with 10M+ safe man-hours.',
                'is_featured': False,
                'image_url': '/images/hero-2.png',
            },
            {
                'title': 'Fly Ash Brick Manufacturing Partnership',
                'content': '''BIFPCL has signed partnership agreements with local entrepreneurs for 100% utilization of fly ash in brick manufacturing.

This initiative converts industrial byproduct into sustainable construction material, creating local employment and reducing environmental impact. The fly ash bricks are stronger and more affordable than conventional bricks.''',
                'summary': '100% fly ash utilization through local brick manufacturing partnerships.',
                'is_featured': False,
                'image_url': '/images/sustainability-hero.png',
            },
        ]
        for article in news_articles:
            News.objects.create(**article)
        self.stdout.write(self.style.SUCCESS(f'📰 Created {len(news_articles)} news articles'))

    def seed_careers(self):
        """Seed job postings."""
        careers = [
            {
                'title': 'Senior Power Plant Engineer',
                'department': 'Operations',
                'location': 'Rampal, Bagerhat',
                'description': 'Lead the operations team for 660 MW supercritical thermal power unit. Responsible for plant efficiency, safety protocols, shift management, and team coordination.',
                'requirements': '''• B.Sc/B.Tech in Mechanical/Electrical Engineering from recognized university
• 10+ years experience in thermal power plants (500 MW+ preferred)
• Knowledge of ultra-supercritical technology
• Strong leadership and communication skills
• Willingness to work in shifts''',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=30),
                'vacancies': 2,
            },
            {
                'title': 'Environmental Officer',
                'department': 'Environment & Safety',
                'location': 'Rampal, Bagerhat',
                'description': 'Monitor and ensure compliance with environmental regulations. Prepare EIA reports, coordinate with regulatory bodies, and implement green initiatives.',
                'requirements': '''• M.Sc in Environmental Science or related field
• 5+ years experience in industrial environmental management
• Knowledge of EIA process and regulatory compliance
• Experience with CEMS and environmental monitoring
• Strong analytical and reporting skills''',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=25),
                'vacancies': 1,
            },
            {
                'title': 'Electrical Maintenance Technician',
                'department': 'Maintenance',
                'location': 'Rampal, Bagerhat',
                'description': 'Perform preventive and corrective maintenance on electrical systems including transformers, switchgear, motors, and control systems.',
                'requirements': '''• Diploma in Electrical Engineering
• 3+ years experience in power plant maintenance
• Valid electrical work permit
• Knowledge of HT/LT systems
• Ability to work in shifts and during shutdowns''',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=20),
                'vacancies': 5,
            },
            {
                'title': 'Finance Manager',
                'department': 'Finance',
                'location': 'Dhaka Office',
                'description': 'Manage financial operations including budgeting, reporting, and compliance. Coordinate with BPDB, NTPC, and financial institutions.',
                'requirements': '''• CA/CMA or MBA in Finance
• 8+ years experience in corporate finance
• Knowledge of power sector financing
• Experience with ERP systems
• Excellent analytical and presentation skills''',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=45),
                'vacancies': 1,
            },
            {
                'title': 'HR Intern',
                'department': 'Human Resources',
                'location': 'Dhaka Office',
                'description': 'Support HR team in recruitment, training coordination, and employee engagement activities. Great learning opportunity for fresh graduates.',
                'requirements': '''• BBA/MBA in HRM or related field
• Excellent communication skills in Bengali and English
• Proficiency in MS Office
• Strong organizational skills
• Fresh graduates welcome''',
                'job_type': 'internship',
                'deadline': timezone.now().date() + timedelta(days=15),
                'vacancies': 3,
            },
            {
                'title': 'Control Room Operator',
                'department': 'Operations',
                'location': 'Rampal, Bagerhat',
                'description': 'Monitor and control power generation systems through DCS. Ensure safe and efficient plant operation while maintaining grid stability requirements.',
                'requirements': '''• B.Sc in Electrical/Mechanical Engineering
• 3+ years experience in power plant control room
• Knowledge of DCS and SCADA systems
• Ability to work in rotating shifts
• Strong problem-solving skills''',
                'job_type': 'full_time',
                'deadline': timezone.now().date() + timedelta(days=25),
                'vacancies': 8,
            },
            {
                'title': 'Security Supervisor',
                'department': 'Administration',
                'location': 'Rampal, Bagerhat',
                'description': 'Supervise security operations, manage security personnel, coordinate with local authorities, and ensure asset protection at plant site.',
                'requirements': '''• Ex-serviceman preferred (Subedar/Havildar rank)
• 5+ years experience in industrial security
• Valid security license
• Knowledge of access control systems
• Strong leadership skills''',
                'job_type': 'contract',
                'deadline': timezone.now().date() + timedelta(days=10),
                'vacancies': 3,
            },
        ]
        for career in careers:
            Career.objects.create(**career)
        self.stdout.write(self.style.SUCCESS(f'💼 Created {len(careers)} career postings'))
